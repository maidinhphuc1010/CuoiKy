import React, { useEffect } from 'react';
import { Form, Input, Button, DatePicker } from 'antd';
import moment from 'moment';

interface Props {
  onSubmit: (record: Borow.BorrowRecord) => void;
  onCancel: () => void;
  initialData?: Borow.BorrowRecord | null;
}

const BorrowForm: React.FC<Props> = ({ onSubmit, onCancel, initialData }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialData) {
      form.setFieldsValue({
        ...initialData,
        borrowDate: moment(initialData.borrowDate),
        returnDate: moment(initialData.returnDate),
      });
    } else {
      form.resetFields();
    }
  }, [initialData, form]);

  const onFinish = (values: any) => {
    const newRecord: Borow.BorrowRecord = {
      id: initialData?.id ?? Date.now(),
      borrowerName: values.borrowerName,
      borrowerEmail: values.borrowerEmail,
      borrowerPhone: values.borrowerPhone,
      deviceName: values.deviceName,
      borrowDate: values.borrowDate.format(),
      returnDate: values.returnDate.format(),
      status: 'waiting',
      description: values.description || '',
      // Loại bỏ attachmentUrl, attachmentName
    };
    onSubmit(newRecord);
    form.resetFields();
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish} preserve={false}>
      <Form.Item
        label="Họ tên người mượn"
        name="borrowerName"
        rules={[{ required: true, message: 'Vui lòng nhập họ tên' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Email"
        name="borrowerEmail"
        rules={[
          { required: true, message: 'Vui lòng nhập email' },
          { type: 'email', message: 'Email không hợp lệ' },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Số điện thoại"
        name="borrowerPhone"
        rules={[
          { required: true, message: 'Vui lòng nhập số điện thoại' },
          { pattern: /^[0-9]{9,15}$/, message: 'Số điện thoại phải từ 9 đến 15 chữ số' },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Tên thiết bị"
        name="deviceName"
        rules={[{ required: true, message: 'Vui lòng nhập tên thiết bị' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Ngày mượn"
        name="borrowDate"
        rules={[{ required: true, message: 'Vui lòng chọn ngày mượn' }]}
      >
        <DatePicker style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item
        label="Ngày trả dự kiến"
        name="returnDate"
        rules={[{ required: true, message: 'Vui lòng chọn ngày trả dự kiến' }]}
      >
        <DatePicker style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item label="Lý do mượn" name="description">
        <Input.TextArea rows={3} />
      </Form.Item>

      <Form.Item style={{ textAlign: 'right' }}>
        <Button type="primary" htmlType="submit" style={{ marginRight: 8 }}>
          Thêm mới
        </Button>
        <Button onClick={onCancel}>Hủy</Button>
      </Form.Item>
    </Form>
  );
};

export default BorrowForm;
