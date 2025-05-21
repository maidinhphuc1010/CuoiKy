import React, { useState } from 'react';
import { Card, Descriptions, Button, Modal, Form, Input, DatePicker, message, Select } from 'antd';
import { EditOutlined, LockOutlined } from '@ant-design/icons';
import { history } from 'umi';
import styles from './styles.less';
import dayjs, { Dayjs } from 'dayjs';

const { Option } = Select;

interface StudentProfile {
  fullName: string;
  dateOfBirth: string | Dayjs;
  studentId: string;
  class: string;
  email: string;
  phone: string;
}

const ProfilePage: React.FC = () => {
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [profile, setProfile] = useState<StudentProfile>({
    fullName: 'Nguyễn Văn A',
    dateOfBirth: '2000-01-01',
    studentId: 'SV001',
    class: 'CNTT1',
    email: 'nguyenvana@example.com',
    phone: '0123456789'
  });

  const handleEdit = () => {
    const profileForForm: any = { ...profile };
    if (typeof profileForForm.dateOfBirth === 'string' && profileForForm.dateOfBirth) {
      profileForForm.dateOfBirth = dayjs(profileForForm.dateOfBirth);
    }
    form.setFieldsValue(profileForForm);
    setIsEditModalVisible(true);
  };

  const handleSave = async (values: any) => {
    try {
      const valuesForSave = { ...values };
      if (valuesForSave.dateOfBirth && dayjs.isDayjs(valuesForSave.dateOfBirth)) {
        valuesForSave.dateOfBirth = valuesForSave.dateOfBirth.format('YYYY-MM-DD');
      }

      setProfile({ ...profile, ...valuesForSave });
      message.success('Cập nhật thông tin thành công!');
      setIsEditModalVisible(false);
    } catch (error) {
      message.error('Cập nhật thông tin thất bại!');
    }
  };

  return (
    <div className={styles.container}>
      <Card
        title="Thông tin cá nhân"
        extra={
          <div className={styles.actions}>
            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={handleEdit}
              className={styles.editButton}
            >
              Chỉnh sửa
            </Button>
            <Button
              icon={<LockOutlined />}
              onClick={() => history.push('/auth/change-password')}
            >
              Đổi mật khẩu
            </Button>
          </div>
        }
      >
        <Descriptions bordered column={1}>
          <Descriptions.Item label="Họ và tên">{profile.fullName}</Descriptions.Item>
          <Descriptions.Item label="Ngày sinh">{typeof profile.dateOfBirth === 'string' ? profile.dateOfBirth : profile.dateOfBirth?.format('YYYY-MM-DD')}</Descriptions.Item>
          <Descriptions.Item label="Mã sinh viên">{profile.studentId}</Descriptions.Item>
          <Descriptions.Item label="Lớp">{profile.class}</Descriptions.Item>
          <Descriptions.Item label="Email">{profile.email}</Descriptions.Item>
          <Descriptions.Item label="Số điện thoại">{profile.phone}</Descriptions.Item>
        </Descriptions>
      </Card>

      <Modal
        title="Chỉnh sửa thông tin"
        open={isEditModalVisible}
        onCancel={() => setIsEditModalVisible(false)}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSave}
        >
          <Form.Item
            name="fullName"
            label="Họ và tên"
            rules={[{ required: true, message: 'Vui lòng nhập họ và tên!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="studentId"
            label="Mã sinh viên"
            rules={[{ required: true, message: 'Vui lòng nhập mã sinh viên!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="class"
            label="Lớp"
            rules={[{ required: true, message: 'Vui lòng chọn lớp!' }]}
          >
            <Select placeholder="Chọn lớp">
              <Option value="CNTT1">CNTT1</Option>
              <Option value="CNTT2">CNTT2</Option>
              <Option value="CNTT3">CNTT3</Option>
              <Option value="CNTT4">CNTT4</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Vui lòng nhập email!' },
              { type: 'email', message: 'Email không hợp lệ!' }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="dateOfBirth"
            label="Ngày sinh"
            rules={[{ required: true, message: 'Vui lòng chọn ngày sinh!' }]}
          >
            <DatePicker style={{ width: '100%' }} format="YYYY-MM-DD" />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Số điện thoại"
            rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Lưu thay đổi
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ProfilePage; 