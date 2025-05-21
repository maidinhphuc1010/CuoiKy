import React, { useEffect, useState } from 'react';
import { Tabs, Button, Modal, Form, Input, message, DatePicker } from 'antd';
import moment from 'moment';
import BorrowTable from './BorrowTable';
import BorrowForm from './BorrowForm';
import useBorowModel from '@/models/useBorowModel';
import {
  waitingColumns,
  borrowingColumns,
  returnedColumns,
  rejectedColumns,
} from './borrowColumns';

import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const { TabPane } = Tabs;

const BorrowAdmin: React.FC = () => {
  const { data, getDataBorow, addBorowRecord, updateBorowRecord } = useBorowModel();

  const [modalVisible, setModalVisible] = useState(false);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [detailText, setDetailText] = useState<string>('');

  const [approveModalVisible, setApproveModalVisible] = useState(false);
  const [approveRecord, setApproveRecord] = useState<Borow.BorrowRecord | null>(null);

  const [rejectModalVisible, setRejectModalVisible] = useState(false);
  const [rejectRecord, setRejectRecord] = useState<Borow.BorrowRecord | null>(null);
  const [rejectForm] = Form.useForm();

  const [returnModalVisible, setReturnModalVisible] = useState(false);
  const [returnRecord, setReturnRecord] = useState<Borow.BorrowRecord | null>(null);
  const [returnForm] = Form.useForm();

  useEffect(() => {
    getDataBorow();
  }, []);

  useEffect(() => {
    if (data.length === 0) return;

    const now = new Date();
    const hasOverdue = data.some(
      (item) => item.status === 'borrowing' && new Date(item.returnDate) < now,
    );

    if (hasOverdue) {
      Modal.warning({
        title: 'Cảnh báo quá hạn',
        content: 'Có sản phẩm quá hạn chưa được trả. Vui lòng kiểm tra và xử lý kịp thời.',
      });
    }
  }, [data]);

  const updateStatus = (record: Borow.BorrowRecord) => {
    updateBorowRecord(record);
    message.success(`Cập nhật trạng thái thành công: ${record.status}`);
  };

  const filterByStatus = (status: Borow.BorrowStatus) => data.filter((item) => item.status === status);

  const filterBorrowingAndOverdue = () =>
    data.filter((item) => item.status === 'borrowing' || item.status === 'overdue');

  const onClickApprove = (record: Borow.BorrowRecord) => {
    setApproveRecord(record);
    setApproveModalVisible(true);
  };
  const handleApproveConfirm = () => {
    if (approveRecord) {
      updateStatus({ ...approveRecord, status: 'borrowing' });
    }
    setApproveModalVisible(false);
  };

  const onClickReject = (record: Borow.BorrowRecord) => {
    setRejectRecord(record);
    setRejectModalVisible(true);
    rejectForm.resetFields();
  };
  const handleRejectSubmit = async () => {
    try {
      const values = await rejectForm.validateFields();
      if (rejectRecord) {
        updateStatus({
          ...rejectRecord,
          status: 'rejected',
          rejectReason: values.reason,
          description: values.reason,
        });
      }
      setRejectModalVisible(false);
      message.success('Đã từ chối mượn và lưu lý do');
    } catch {}
  };

  const onClickReturn = (record: Borow.BorrowRecord) => {
    setReturnRecord(record);
    setReturnModalVisible(true);
    returnForm.setFieldsValue({ actualReturnDate: moment() });
  };
  const handleReturnConfirm = async () => {
    try {
      const values = await returnForm.validateFields();
      if (returnRecord) {
        updateStatus({
          ...returnRecord,
          status: 'returned',
          actualReturnDate: values.actualReturnDate.toISOString(),
        });
      }
      setReturnModalVisible(false);
      setReturnRecord(null);
      returnForm.resetFields();
    } catch {}
  };

  const openDetailModal = (text: string) => {
    setDetailText(text);
    setDetailModalVisible(true);
  };

  const handleAddSubmit = (record: Borow.BorrowRecord) => {
    addBorowRecord(record);
    setModalVisible(false);
    message.success('Thêm mượn chờ duyệt thành công');
  };

  // Xuất file Excel: loại bỏ cột file đính kèm
  const exportReturnedData = () => {
    const returnedData = filterByStatus('returned');
    if (returnedData.length === 0) {
      message.info('Không có dữ liệu để xuất');
      return;
    }

    const exportData = returnedData.map((item) => ({
      'Người mượn': item.borrowerName,
      Email: item.borrowerEmail,
      'SĐT': item.borrowerPhone,
      'Thiết bị': item.deviceName,
      'Ngày mượn': moment(item.borrowDate).format('DD/MM/YYYY'),
      'Ngày trả dự kiến': moment(item.returnDate).format('DD/MM/YYYY'),
      'Ngày trả thực tế': item.actualReturnDate ? moment(item.actualReturnDate).format('DD/MM/YYYY HH:mm') : '',
      'Lý do mượn': item.description || '',
      // Bỏ file đính kèm
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Đã trả');

    const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([wbout], { type: 'application/octet-stream' });
    saveAs(blob, 'Danh_sach_da_tra.xlsx');
  };

  return (
    <>
      <Tabs defaultActiveKey="waiting" type="card" centered>
        <TabPane tab="Chờ duyệt" key="waiting">
          <Button type="primary" style={{ marginBottom: 16 }} onClick={() => setModalVisible(true)}>
            Thêm mới chờ duyệt
          </Button>
          <BorrowTable
            data={filterByStatus('waiting')}
            columns={waitingColumns(onClickApprove, onClickReject, openDetailModal)}
          />
        </TabPane>

        <TabPane tab="Đang mượn" key="borrowing">
          <BorrowTable
            data={filterBorrowingAndOverdue()}
            columns={borrowingColumns(onClickReturn, openDetailModal)}
          />
        </TabPane>

        <TabPane tab="Đã trả" key="returned">
          <Button onClick={exportReturnedData} style={{ marginBottom: 16 }}>
            Xuất danh sách đã trả
          </Button>
          <BorrowTable
            data={filterByStatus('returned')}
            columns={returnedColumns(openDetailModal)}
          />
        </TabPane>

        <TabPane tab="Từ chối" key="rejected">
          <BorrowTable data={filterByStatus('rejected')} columns={rejectedColumns} />
        </TabPane>
      </Tabs>

      {/* Modal xem chi tiết lý do mượn */}
      <Modal
        title="Chi tiết lý do mượn"
        visible={detailModalVisible}
        onCancel={() => setDetailModalVisible(false)}
        footer={null}
        width={500}
      >
        <p style={{ whiteSpace: 'pre-wrap' }}>{detailText}</p>
      </Modal>

      {/* Modal xác nhận duyệt */}
      <Modal
        title="Xác nhận duyệt mượn"
        visible={approveModalVisible}
        onOk={handleApproveConfirm}
        onCancel={() => setApproveModalVisible(false)}
        okText="Đồng ý"
        cancelText="Hủy"
      >
        <p>Bạn có chắc chắn duyệt mượn thiết bị này không?</p>
        {approveRecord && (
          <ul>
            <li>
              <b>Người mượn:</b> {approveRecord.borrowerName}
            </li>
            <li>
              <b>Thiết bị:</b> {approveRecord.deviceName}
            </li>
            <li>
              <b>Ngày mượn:</b> {moment(approveRecord.borrowDate).format('DD/MM/YYYY')}
            </li>
            <li>
              <b>Ngày trả dự kiến:</b> {moment(approveRecord.returnDate).format('DD/MM/YYYY')}
            </li>
            <li>
              <b>Lý do mượn:</b> {approveRecord.description || 'Không có'}
            </li>
          </ul>
        )}
      </Modal>

      {/* Modal nhập lý do từ chối */}
      <Modal
        title="Nhập lý do từ chối"
        visible={rejectModalVisible}
        onOk={handleRejectSubmit}
        onCancel={() => setRejectModalVisible(false)}
        okText="Xác nhận"
        cancelText="Hủy"
      >
        <Form form={rejectForm} layout="vertical" name="reject_form">
          <Form.Item
            name="reason"
            label="Lý do từ chối"
            rules={[{ required: true, message: 'Vui lòng nhập lý do từ chối' }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal trả thiết bị */}
      <Modal
        title="Xác nhận trả thiết bị"
        visible={returnModalVisible}
        onOk={handleReturnConfirm}
        onCancel={() => {
          setReturnModalVisible(false);
          returnForm.resetFields();
        }}
        okText="Xác nhận"
        cancelText="Hủy"
        destroyOnClose
      >
        <Form form={returnForm} layout="vertical" name="return_form">
          <Form.Item
            name="actualReturnDate"
            label="Ngày giờ trả thực tế"
            rules={[{ required: true, message: 'Vui lòng chọn ngày giờ trả thực tế' }]}
          >
            <DatePicker
              showTime
              format="DD/MM/YYYY HH:mm"
              style={{ width: '100%' }}
              disabledDate={(current) => current && current > moment().endOf('day')}
            />
          </Form.Item>
          <p>Bạn có chắc chắn đã trả thiết bị này không?</p>
        </Form>
      </Modal>

      {/* Modal thêm mới */}
      <Modal
        title="Thêm mượn chờ duyệt"
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        destroyOnClose
        width={600}
      >
        <BorrowForm onSubmit={handleAddSubmit} onCancel={() => setModalVisible(false)} />
      </Modal>
    </>
  );
};

export default BorrowAdmin;
