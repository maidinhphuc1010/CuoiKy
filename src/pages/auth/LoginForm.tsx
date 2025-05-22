import React from 'react';
import { Form, Input, Button, Card, message, Radio, Row, Col, Space, Typography } from 'antd';
import { MailOutlined, LockOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { history, Link } from 'umi';
import styles from './styles.less';

const { Title, Text } = Typography;

const LoginForm: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    try {
      // TODO: Call API to login
      console.log('Received values of form: ', values);
      message.success('Đăng nhập thành công!');
      if (values.role === 'admin') {
        history.push('/dashboard');
      } else {
        history.push('/student/dashboard');
      }
    } catch (error) {
      message.error('Đăng nhập thất bại!');
    }
  };

  return (
    <div className={styles.container}>
      <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
        <Col xs={24} sm={22} md={18} lg={14} xl={10}>
          <Card className={styles.card} style={{ width: '100%' }}>
            <Space direction="vertical" size="large" style={{ width: '100%', textAlign: 'center' }}>
              <Button 
                type="link" 
                icon={<ArrowLeftOutlined />} 
                onClick={() => history.push('/auth/login')}
                style={{ alignSelf: 'flex-start', marginBottom: 8 }}
              >
                Quay lại trang chính
              </Button>

              <div style={{ textAlign: 'center', marginBottom: 24 }}>
                <Title level={2} style={{ marginBottom: 0 }}>Đăng nhập</Title>
                <Text type="secondary">Điền thông tin tài khoản của bạn</Text>
              </div>

              <Form
                form={form}
                name="login"
                onFinish={onFinish}
                layout="vertical"
                className={styles.form}
              >
                <Form.Item
                  name="role"
                  initialValue="student"
                >
                  <Radio.Group>
                    <Radio.Button value="student">Sinh viên</Radio.Button>
                    <Radio.Button value="admin">Quản trị viên</Radio.Button>
                  </Radio.Group>
                </Form.Item>

                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    { required: true, message: 'Vui lòng nhập email!' },
                    { type: 'email', message: 'Email không hợp lệ!' }
                  ]}
                >
                  <Input 
                    prefix={<MailOutlined />} 
                    placeholder="Email" 
                    size="large"
                  />
                </Form.Item>

                <Form.Item
                  name="password"
                  label="Mật khẩu"
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

                <div style={{ textAlign: 'right', marginBottom: 24 }}>
                  <Space size="middle">
                    <Button type="link" onClick={() => history.push('/auth/forgot-password')}>Quên mật khẩu?</Button>
                    <Button type="link" onClick={() => history.push('/auth/change-password')}>Đổi mật khẩu</Button>
                  </Space>
                </div>

                <Form.Item style={{ marginBottom: 0 }}>
                  <Button type="primary" htmlType="submit" block size="large" danger style={{ height: 48, fontWeight: 'bold' }}>
                    Đăng nhập
                  </Button>
                </Form.Item>

                <Form.Item>
                  <div style={{ textAlign: 'center', marginTop: 16 }}>
                    <Text type="secondary">
                      Chưa có tài khoản? <Link to="/auth/register-form">Đăng ký ngay</Link>
                    </Text>
                  </div>
                </Form.Item>
              </Form>
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default LoginForm; 