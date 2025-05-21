import React from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface BorrowTableProps {
  data: Borow.BorrowRecord[];
  columns: ColumnsType<Borow.BorrowRecord>;
  loading?: boolean;
}

const BorrowTable: React.FC<BorrowTableProps> = ({ data, columns, loading }) => {
  return (
    <Table
      rowKey="id"
      dataSource={data}
      columns={columns}
      pagination={{ pageSize: 6 }}
      scroll={{ x: 'max-content' }}
      loading={loading}
    />
  );
};

export default BorrowTable;
