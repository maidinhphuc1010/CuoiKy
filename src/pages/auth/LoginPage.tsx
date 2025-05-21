import React from 'react';
import { Card, Button, Typography, Space, Row, Col, message } from 'antd';
import { LoginOutlined, UserAddOutlined } from '@ant-design/icons';
import { Link, history } from 'umi';
import styles from './styles.less';

const { Title, Text } = Typography;

const LoginPage: React.FC = () => {
  // --- Removed: Authentication Simulation ---
  // const simulateLogin = () => { ... }; // Removed
  // --- End: Removed Authentication Simulation ---

  return (
    <div className={styles.container}>
      <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
        <Col xs={24} sm={20} md={16} lg={10} xl={8}>
          <Card className={styles.card} style={{ width: '100%', maxWidth: 400 }}>
            <Space direction="vertical" size="large" style={{ width: '100%', textAlign: 'center' }}>
              <Title level={2}>Hệ thống quản lý thiết bị</Title>
              <Text type="secondary">Đăng nhập hoặc đăng ký để tiếp tục</Text>

              <Space direction="vertical" style={{ width: '100%', marginTop: 32 }} size="middle">
                <Button 
                  type="primary" 
                  icon={<LoginOutlined />}
                  size="large"
                  block
                  danger
                  style={{ height: 48, fontWeight: 'bold' }}
                >
                  <Link to="/auth/login-form" style={{ color: 'white' }}>Đăng nhập</Link>
                </Button>
                <Button 
                  icon={<UserAddOutlined />}
                  size="large"
                  block
                  style={{ height: 48 }}
                >
                  <Link to="/auth/register-form">Đăng ký</Link>
                </Button>
              </Space>

              <div style={{ marginTop: 24 }}>
                <Text type="secondary">
                  Bạn là sinh viên? <Link to="/student/dashboard">Xem trang chủ</Link>
                </Text>
              </div>
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default LoginPage;
