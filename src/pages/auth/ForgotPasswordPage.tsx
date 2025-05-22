import React, { useState } from 'react';
import { Form, Input, Button, Card, message, Steps } from 'antd';
import { MailOutlined, LockOutlined, SafetyOutlined } from '@ant-design/icons';
import { history } from 'umi';
import styles from './styles.less';

const { Step } = Steps;

const ForgotPasswordPage: React.FC = () => {
  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState(0);
  const [email, setEmail] = useState('');

  const onSendOTP = async (values: any) => {
    try {
      // TODO: Call API to send OTP
      setEmail(values.email);
      message.success('Mã OTP đã được gửi đến email của bạn!');
      setCurrentStep(1);
    } catch (error) {
      message.error('Gửi mã OTP thất bại!');
    }
  };

  const onVerifyOTP = async (values: any) => {
    try {
      // TODO: Call API to verify OTP
      message.success('Xác thực OTP thành công!');
      setCurrentStep(2);
    } catch (error) {
      message.error('Xác thực OTP thất bại!');
    }
  };

  const onResetPassword = async (values: any) => {
    try {
      if (values.newPassword !== values.confirmPassword) {
        message.error('Mật khẩu xác nhận không khớp!');
        return;
      }
      // TODO: Call API to reset password
      message.success('Đặt lại mật khẩu thành công!');
      history.push('/auth/login');
    } catch (error) {
      message.error('Đặt lại mật khẩu thất bại!');
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <Form form={form} onFinish={onSendOTP} layout="vertical">
            <Form.Item
              name="email"
              rules={[
                { required: true, message: 'Vui lòng nhập email!' },
                { type: 'email', message: 'Email không hợp lệ!' }
              ]}
            >
              <Input prefix={<MailOutlined />} placeholder="Email" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Gửi mã OTP
              </Button>
            </Form.Item>
          </Form>
        );
      case 1:
        return (
          <Form form={form} onFinish={onVerifyOTP} layout="vertical">
            <Form.Item
              name="otp"
              rules={[{ required: true, message: 'Vui lòng nhập mã OTP!' }]}
            >
              <Input prefix={<SafetyOutlined />} placeholder="Mã OTP" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Xác nhận OTP
              </Button>
            </Form.Item>
          </Form>
        );
      case 2:
        return (
          <Form form={form} onFinish={onResetPassword} layout="vertical">
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
                Đặt lại mật khẩu
              </Button>
            </Form.Item>
          </Form>
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.container}>
      <Card title="Quên mật khẩu" className={styles.card}>
        <Steps current={currentStep} className={styles.steps}>
          <Step title="Nhập email" />
          <Step title="Xác thực OTP" />
          <Step title="Đặt lại mật khẩu" />
        </Steps>
        <div className={styles.stepsContent}>{renderStepContent()}</div>
      </Card>
    </div>
  );
};

export default ForgotPasswordPage;
