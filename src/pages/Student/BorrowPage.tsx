import React, { useState } from 'react';
import { Table, Button, Modal, Form, Input, DatePicker, Upload, message, Tag, InputNumber } from 'antd';
import { EyeOutlined, UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import styles from './styles.less';

interface Equipment {
  id: string;
  name: string;
  type: string;
  quantity: number;
  unit: string;
  description: string;
}

interface BorrowForm {
  borrowDate: string;
  returnDate: string;
  reason: string;
  file?: any;
  borrowQuantity: number;
}

const BorrowPage: React.FC = () => {
  const [isBorrowModalVisible, setIsBorrowModalVisible] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null);
  const [form] = Form.useForm();

  const equipmentList: Equipment[] = [
    {
      id: '1',
      name: 'Máy chiếu',
      type: 'Thiết bị trình chiếu',
      quantity: 5,
      unit: 'Phòng Đa phương tiện',
      description: 'Máy chiếu Epson EB-X05, độ phân giải 1024x768'
    },
    // Add more equipment items here
  ];

  const columns = [
    {
      title: 'Tên thiết bị',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Loại thiết bị',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (quantity: number) => (
        <Tag color={quantity > 0 ? 'green' : 'red'}>
          {quantity}
        </Tag>
      ),
    },
    {
      title: 'Đơn vị quản lý',
      dataIndex: 'unit',
      key: 'unit',
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
      render: (description: string) => (
        <div className={styles.descriptionCell}>
          <span>{description.substring(0, 50)}...</span>
          <Button
            type="link"
            icon={<EyeOutlined />}
            onClick={() => message.info(description)}
          />
        </div>
      ),
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_: any, record: Equipment) => (
        <Button
          type="primary"
          onClick={() => handleBorrow(record)}
          disabled={record.quantity === 0}
        >
          Mượn ngay
        </Button>
      ),
    },
  ];

  const handleBorrow = (equipment: Equipment) => {
    if (equipment.quantity === 0) {
      message.warning('Thiết bị đã hết!');
      return;
    }
    setSelectedEquipment(equipment);
    setIsBorrowModalVisible(true);
    form.setFieldsValue({ borrowQuantity: 1 });
  };

  const handleBorrowSubmit = async (values: BorrowForm) => {
    try {
      console.log('Borrow request values:', values);
      message.success('Gửi yêu cầu mượn thành công!');
      setIsBorrowModalVisible(false);
      form.resetFields();
    } catch (error) {
      message.error('Gửi yêu cầu mượn thất bại!');
    }
  };

  const uploadProps: UploadProps = {
    beforeUpload: (file) => {
      const isPDF = file.type === 'application/pdf';
      if (!isPDF) {
        message.error('Chỉ chấp nhận file PDF!');
      }
      return isPDF || Upload.LIST_IGNORE;
    },
    maxCount: 1,
  };

  return (
    <div className={styles.container}>
      <Table
        columns={columns}
        dataSource={equipmentList}
        rowKey="id"
        className={styles.table}
      />

      <Modal
        title="Mượn thiết bị"
        open={isBorrowModalVisible}
        onCancel={() => setIsBorrowModalVisible(false)}
        footer={null}
        width={600}
      >
        {selectedEquipment && (
          <div className={styles.equipmentInfo}>
            <h3>Thông tin thiết bị</h3>
            <p><strong>Mã thiết bị:</strong> {selectedEquipment.id}</p>
            <p><strong>Tên thiết bị:</strong> {selectedEquipment.name}</p>
          </div>
        )}

        <Form
          form={form}
          layout="vertical"
          onFinish={handleBorrowSubmit}
        >
          <Form.Item
            name="borrowQuantity"
            label="Số lượng mượn"
            rules={[
              { required: true, message: 'Vui lòng nhập số lượng mượn!' },
              { type: 'number', min: 1, message: 'Số lượng mượn phải lớn hơn 0!' },
            ]}
          >
            <InputNumber style={{ width: '100%' }} min={1} />
          </Form.Item>

          <Form.Item
            name="borrowDate"
            label="Ngày mượn"
            rules={[{ required: true, message: 'Vui lòng chọn ngày mượn!' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name="returnDate"
            label="Ngày trả"
            rules={[{ required: true, message: 'Vui lòng chọn ngày trả!' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name="reason"
            label="Lý do mượn"
            rules={[{ required: true, message: 'Vui lòng nhập lý do mượn!' }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>

          <Form.Item
            name="file"
            label="File kế hoạch tổ chức"
          >
            <Upload {...uploadProps}>
              <Button icon={<UploadOutlined />}>Tải lên file PDF</Button>
            </Upload>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Gửi yêu cầu
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default BorrowPage;
