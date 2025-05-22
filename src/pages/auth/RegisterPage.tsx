import React from 'react';
import { Form, Input, Button, Card, message, Select } from 'antd';
import { UserOutlined, LockOutlined, IdcardOutlined, TeamOutlined } from '@ant-design/icons';
import { history } from 'umi';
import styles from './styles.less';

const { Option } = Select;

const RegisterPage: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    try {
      if (values.password !== values.confirmPassword) {
        message.error('Mật khẩu xác nhận không khớp!');
        return;
      }
      // TODO: Call API to register
      message.success('Đăng ký thành công!');
      history.push('/auth/login');
    } catch (error) {
      message.error('Đăng ký thất bại!');
    }
  };

  return (
    <div className={styles.container}>
      <Card title="Đăng ký tài khoản" className={styles.card}>
        <Form
          form={form}
          name="register"
          onFinish={onFinish}
          layout="vertical"
          className={styles.form}
        >
          <Form.Item
            name="fullName"
            rules={[
              { required: true, message: 'Vui lòng nhập họ và tên!' },
              { min: 2, message: 'Họ và tên phải có ít nhất 2 ký tự!' }
            ]}
          >
            <Input 
              prefix={<UserOutlined />} 
              placeholder="Họ và tên" 
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="studentId"
            rules={[
              { required: true, message: 'Vui lòng nhập mã sinh viên!' },
              { pattern: /^[A-Za-z0-9]+$/, message: 'Mã sinh viên không được chứa ký tự đặc biệt!' }
            ]}
          >
            <Input 
              prefix={<IdcardOutlined />} 
              placeholder="Mã sinh viên" 
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="class"
            rules={[{ required: true, message: 'Vui lòng chọn lớp!' }]}
          >
            <Select
              placeholder="Chọn lớp"
              size="large"
            >
              <Option value="CNTT1">CNTT1</Option>
              <Option value="CNTT2">CNTT2</Option>
              <Option value="CNTT3">CNTT3</Option>
              <Option value="CNTT4">CNTT4</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: 'Vui lòng nhập mật khẩu!' },
              { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự!' }
            ]}
          >
            <Input.Password 
              prefix={<LockOutlined />} 
              placeholder="Mật khẩu" 
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            dependencies={['password']}
            rules={[
              { required: true, message: 'Vui lòng xác nhận mật khẩu!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Mật khẩu xác nhận không khớp!'));
                },
              }),
            ]}
          >
            <Input.Password 
              prefix={<LockOutlined />} 
              placeholder="Xác nhận mật khẩu" 
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block size="large">
              Đăng ký
            </Button>
          </Form.Item>

          <Form.Item>
            <Button type="link" block onClick={() => history.push('/auth/login')}>
              Đã có tài khoản? Đăng nhập
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default RegisterPage;
