import React from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import { history } from 'umi';
import styles from './styles.less';

const ChangePasswordPage: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    try {
      if (values.newPassword !== values.confirmPassword) {
        message.error('Mật khẩu xác nhận không khớp!');
        return;
      }
      // TODO: Call API to change password
      message.success('Đổi mật khẩu thành công!');
      history.push('/student/profile');
    } catch (error) {
      message.error('Đổi mật khẩu thất bại!');
    }
  };

  return (
    <div className={styles.container}>
      <Card title="Đổi mật khẩu" className={styles.card}>
        <Form
          form={form}
          name="change-password"
          onFinish={onFinish}
          layout="vertical"
          className={styles.form}
        >
          <Form.Item
            name="oldPassword"
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu cũ!' }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Mật khẩu cũ" />
          </Form.Item>

          <Form.Item
            name="newPassword"
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu mới!' }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Mật khẩu mới" />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            rules={[{ required: true, message: 'Vui lòng xác nhận mật khẩu!' }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Xác nhận mật khẩu" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Đổi mật khẩu
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default ChangePasswordPage;
