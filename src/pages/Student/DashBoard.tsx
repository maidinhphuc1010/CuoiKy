import React from 'react';
import { Card, Row, Col, Statistic, List, Button, Typography, Space, Tag, message, Divider } from 'antd';
import { 
  BookOutlined, 
  ClockCircleOutlined, 
  CheckCircleOutlined, 
  WarningOutlined,
  RightOutlined,
  BellOutlined,
  LinkOutlined,
} from '@ant-design/icons';
import { history } from 'umi';
import styles from './styles.less';

const { Title, Text } = Typography;

const DashBoard: React.FC = () => {
  // Mock data - replace with real data from API
  const statistics = {
    totalBorrowed: 5,
    activeBorrows: 2,
    returnedItems: 3,
    overdueItems: 1
  };

  const recentNotifications = [
    {
      id: 1,
      title: 'Nhắc nhở trả thiết bị',
      content: 'Bạn có thiết bị cần trả vào ngày mai',
      type: 'warning',
      date: '2024-03-15'
    },
    {
      id: 2,
      title: 'Xác nhận mượn thiết bị',
      content: 'Yêu cầu mượn máy chiếu đã được duyệt',
      type: 'success',
      date: '2024-03-14'
    }
  ];

  const quickLinks = [
    {
      title: 'Mượn thiết bị mới',
      path: '/student/borrow',
      icon: <BookOutlined />
    },
    {
      title: 'Xem lịch sử mượn',
      path: '/student/history',
      icon: <ClockCircleOutlined />
    },
    {
      title: 'Cập nhật thông tin',
      path: '/student/profile',
      icon: <CheckCircleOutlined />
    }
  ];

  // --- Always render Dashboard Content ---
  return (
    <div className={styles.container}>
      {/* Page Title and Welcome Message */}
      <div style={{ marginBottom: 32 }}> {/* Added margin below title section */}
        <Title level={2} style={{ margin: 0 }}>Dashboard Sinh viên</Title>
        <Text type="secondary">Chào mừng bạn đến với hệ thống quản lý thiết bị</Text>
        {/* Placeholder for user's name, e.g., <Text strong>Nguyễn Văn A</Text> */}
      </div>

      {/* Statistics Cards */}
      <Row gutter={[24, 24]} style={{ marginBottom: 32 }}> {/* Increased bottom margin */}
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Tổng số thiết bị đã mượn"
              value={statistics.totalBorrowed}
              prefix={<BookOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Đang mượn"
              value={statistics.activeBorrows}
              valueStyle={{ color: '#1890ff' }}
              prefix={<ClockCircleOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Đã trả"
              value={statistics.returnedItems}
              valueStyle={{ color: '#52c41a' }}
              prefix={<CheckCircleOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Quá hạn"
              value={statistics.overdueItems}
              valueStyle={{ color: '#ff4d4f' }}
              prefix={<WarningOutlined />}
            />
          </Card>
        </Col>
      </Row>

      {/* Quick Links and Notifications */}
      <Row gutter={[24, 24]}> {/* Consistent gutter */}
        <Col xs={24} md={12}>
          <Card title={<Space><BellOutlined /> Thông báo gần đây</Space>}>
            <List
              itemLayout="horizontal"
              dataSource={recentNotifications}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    title={
                      <Space>
                        <Tag color={item.type === 'warning' ? 'orange' : 'green'}>
                          {item.type === 'warning' ? <WarningOutlined /> : <CheckCircleOutlined />}
                        </Tag>
                        <Text strong>{item.title}</Text>
                      </Space>
                    }
                    description={
                      <Space direction="vertical" size={4}>
                        <Text>{item.content}</Text>
                        <Text type="secondary" style={{ fontSize: '0.9em' }}>{item.date}</Text>
                      </Space>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card title={<Space><LinkOutlined /> Truy cập nhanh</Space>}>
            <List
              dataSource={quickLinks}
              renderItem={item => (
                <List.Item>
                  <Button 
                    type="text" 
                    icon={item.icon}
                    onClick={() => history.push(item.path)}
                    style={{ width: '100%', textAlign: 'left', padding: '12px 0' }}
                  >
                    <Space style={{ justifyContent: 'space-between', width: '100%' }}>
                      <Text>{item.title}</Text>
                      <RightOutlined />
                    </Space>
                  </Button>
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashBoard;
