import React from 'react';
import { Table, Tag, Card } from 'antd';
import styles from './styles.less';

interface BorrowHistory {
  id: string;
  equipmentName: string;
  borrowDate: string;
  returnDate: string;
  status: 'borrowing' | 'returned' | 'overdue';
}

const BorrowHistoryPage: React.FC = () => {
  const borrowHistory: BorrowHistory[] = [
    {
      id: '1',
      equipmentName: 'Máy chiếu',
      borrowDate: '2024-03-01',
      returnDate: '2024-03-05',
      status: 'borrowing'
    },
    {
      id: '2',
      equipmentName: 'Loa di động',
      borrowDate: '2024-02-20',
      returnDate: '2024-02-25',
      status: 'returned'
    },
    {
      id: '3',
      equipmentName: 'Màn hình LED',
      borrowDate: '2024-02-15',
      returnDate: '2024-02-20',
      status: 'overdue'
    }
  ];

  const getStatusTag = (status: string) => {
    switch (status) {
      case 'borrowing':
        return <Tag color="processing">Đang mượn</Tag>;
      case 'returned':
        return <Tag color="success">Đã trả</Tag>;
      case 'overdue':
        return <Tag color="error">Quá hạn</Tag>;
      default:
        return null;
    }
  };

  const columns = [
    {
      title: 'Tên thiết bị',
      dataIndex: 'equipmentName',
      key: 'equipmentName',
    },
    {
      title: 'Ngày mượn',
      dataIndex: 'borrowDate',
      key: 'borrowDate',
    },
    {
      title: 'Ngày hẹn trả',
      dataIndex: 'returnDate',
      key: 'returnDate',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => getStatusTag(status),
    }
  ];

  return (
    <div className={styles.container}>
      <Card title="Lịch sử mượn thiết bị">
        <Table
          columns={columns}
          dataSource={borrowHistory}
          rowKey="id"
          className={styles.table}
        />
      </Card>
    </div>
  );
};

export default BorrowHistoryPage; 