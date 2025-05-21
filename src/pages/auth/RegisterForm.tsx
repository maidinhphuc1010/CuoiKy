import React from 'react';
import { Form, Input, Button, Card, message, DatePicker, Select, Row, Col } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, PhoneOutlined, IdcardOutlined, ReadOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { history } from 'umi';
import styles from './styles.less';
import dayjs from 'dayjs';

const { Option } = Select;

const RegisterForm: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    try {
      // TODO: Call API to register user
      console.log('Received values of form: ', values);
      message.success('Đăng ký thành công!');
      // Redirect to login page after successful registration
      history.push('/auth/login-form');
    } catch (error) {
      message.error('Đăng ký thất bại!');
    }
  };

  return (
    <div className={styles.container}> {/* Use a container class for padding/centering */}
      <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
        {/* Adjust column size for better centering and responsiveness */}
        <Col xs={24} sm={20} md={16} lg={10} xl={8}> 
          <Card className={styles.card} style={{ width: '100%' }}> {/* Ensure card takes full width of its column */}
            <Button 
              type="link" 
              icon={<ArrowLeftOutlined />} 
              onClick={() => history.push('/auth/login')}
              style={{ marginBottom: 16 }}
            >
              Quay lại trang chính
            </Button>
            <div style={{ textAlign: 'center', marginBottom: 24 }}>
              <h2 style={{ marginBottom: 0 }}>Đăng ký tài khoản</h2>
              <p>Điền thông tin của bạn để tạo tài khoản mới</p>
            </div>

            <Form
              form={form}
              name="register"
              onFinish={onFinish}
              layout="vertical"
              className={styles.form}
            >
              <Form.Item
                name="fullName"
                label="Họ và tên"
                rules={[{ required: true, message: 'Vui lòng nhập họ và tên!' }]
                }
              >
                <Input prefix={<UserOutlined />} placeholder="Nguyễn Văn A" size="large" />
              </Form.Item>

              <Form.Item
                name="studentId"
                label="Mã sinh viên"
                rules={[{ required: true, message: 'Vui lòng nhập mã sinh viên!' }]
                }
              >
                <Input prefix={<IdcardOutlined />} placeholder="SV001" size="large" />
              </Form.Item>

              <Form.Item
                name="class"
                label="Lớp"
                rules={[{ required: true, message: 'Vui lòng chọn lớp!' }]
                }
              >
                <Select placeholder="Chọn lớp" size="large">
                  <Option value="CNTT1">CNTT1</Option>
                  <Option value="CNTT2">CNTT2</Option>
                  <Option value="CNTT3">CNTT3</Option>
                  <Option value="CNTT4">CNTT4</Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="dateOfBirth"
                label="Ngày sinh"
                rules={[{ required: true, message: 'Vui lòng chọn ngày sinh!' }]
                }
              >
                <DatePicker style={{ width: '100%' }} format="YYYY-MM-DD" size="large" />
              </Form.Item>

              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: 'Vui lòng nhập email!' },
                  { type: 'email', message: 'Email không hợp lệ!' }
                ]}
              >
                <Input prefix={<MailOutlined />} placeholder="email@example.com" size="large" />
              </Form.Item>

              <Form.Item
                name="phone"
                label="Số điện thoại"
                rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]
                }
              >
                <Input prefix={<PhoneOutlined />} placeholder="0123456789" size="large" />
              </Form.Item>

              <Form.Item
                name="password"
                label="Mật khẩu"
                rules={[
                  { required: true, message: 'Vui lòng nhập mật khẩu!' },
                  { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự!' }
                ]}
                hasFeedback
              >
                <Input.Password prefix={<LockOutlined />} placeholder="Mật khẩu" size="large" />
              </Form.Item>

              <Form.Item
                name="confirm"
                label="Xác nhận mật khẩu"
                dependencies={['password']}
                hasFeedback
                rules={[
                  { required: true, message: 'Vui lòng xác nhận mật khẩu!' },
                  ({
                    getFieldValue
                  }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('Mật khẩu xác nhận không khớp!'));
                    },
                  }),
                ]}
              >
                <Input.Password prefix={<LockOutlined />} placeholder="Xác nhận mật khẩu" size="large" />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" block size="large" danger style={{ height: 48, fontWeight: 'bold' }}>
                  Đăng ký
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default RegisterForm; 