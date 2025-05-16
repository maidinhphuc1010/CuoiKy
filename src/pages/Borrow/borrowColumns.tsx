import moment from 'moment';
import type { ColumnsType } from 'antd/es/table';
import { Typography, Button } from 'antd';

const { Text, Link } = Typography;

export const commonColumns = (
  onViewDetail: (text: string) => void,
): ColumnsType<Borow.BorrowRecord> => [
  { title: 'Người mượn', dataIndex: 'borrowerName', key: 'borrowerName', width: 150 },
  { title: 'Email', dataIndex: 'borrowerEmail', key: 'borrowerEmail', width: 180 },
  { title: 'SĐT', dataIndex: 'borrowerPhone', key: 'borrowerPhone', width: 130 },
  { title: 'Thiết bị', dataIndex: 'deviceName', key: 'deviceName', width: 180 },
  {
    title: 'Ngày mượn',
    dataIndex: 'borrowDate',
    key: 'borrowDate',
    width: 120,
    render: (text) => moment(text).format('DD/MM/YYYY'),
  },
  {
    title: 'Ngày trả dự kiến',
    dataIndex: 'returnDate',
    key: 'returnDate',
    width: 120,
    render: (text) => moment(text).format('DD/MM/YYYY'),
  },
  {
    title: 'Lý do mượn',
    dataIndex: 'description',
    key: 'description',
    width: 250,
    render: (text: string) => {
      if (!text) return '—';
      if (text.length <= 50) return text;

      const shortText = text.slice(0, 30) + '... ';

      return (
        <>
          <Text>{shortText}</Text>
          <Link onClick={() => onViewDetail(text)}>Xem thêm</Link>
        </>
      );
    },
  },
  // Bỏ cột File đính kèm
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    key: 'status',
    width: 100,
    render: (status: Borow.BorrowStatus) => {
      switch (status) {
        case 'waiting':
          return 'Chờ duyệt';
        case 'borrowing':
          return 'Đang mượn';
        case 'returned':
          return 'Đã trả';
        case 'rejected':
          return 'Từ chối';
        case 'overdue':
          return <span style={{ color: 'red' }}>Quá hạn</span>;
        default:
          return status;
      }
    },
  },
];

export const waitingColumns = (
  onApprove: (record: Borow.BorrowRecord) => void,
  onReject: (record: Borow.BorrowRecord) => void,
  onViewDetail: (text: string) => void,
): ColumnsType<Borow.BorrowRecord> => [
  ...commonColumns(onViewDetail),
  {
    title: 'Thao tác',
    key: 'action',
    width: 180,
    align: 'center',
    render: (_, record) => (
      <>
        <Button type="primary" onClick={() => onApprove(record)} style={{ marginRight: 8 }}>
          Đồng ý
        </Button>
        <Button danger onClick={() => onReject(record)}>
          Từ chối
        </Button>
      </>
    ),
  },
];

export const borrowingColumns = (
  onReturn: (record: Borow.BorrowRecord) => void,
  onViewDetail: (text: string) => void,
): ColumnsType<Borow.BorrowRecord> => [
  ...commonColumns(onViewDetail),
  {
    title: 'Thao tác',
    key: 'action',
    width: 140,
    align: 'center',
    render: (_, record) => (
      <Button type="primary" onClick={() => onReturn(record)}>
        Đã trả
      </Button>
    ),
  },
];

// Tab Đã trả có thêm "Ngày trả thực tế", bỏ cột trạng thái, bỏ file đính kèm
export const returnedColumns = (
  onViewDetail: (text: string) => void,
): ColumnsType<Borow.BorrowRecord> => [
  { title: 'Người mượn', dataIndex: 'borrowerName', key: 'borrowerName', width: 150 },
  { title: 'Email', dataIndex: 'borrowerEmail', key: 'borrowerEmail', width: 180 },
  { title: 'SĐT', dataIndex: 'borrowerPhone', key: 'borrowerPhone', width: 130 },
  { title: 'Thiết bị', dataIndex: 'deviceName', key: 'deviceName', width: 180 },
  {
    title: 'Ngày mượn',
    dataIndex: 'borrowDate',
    key: 'borrowDate',
    width: 120,
    render: (text) => moment(text).format('DD/MM/YYYY'),
  },
  {
    title: 'Ngày trả dự kiến',
    dataIndex: 'returnDate',
    key: 'returnDate',
    width: 120,
    render: (text) => moment(text).format('DD/MM/YYYY'),
  },
  {
    title: 'Ngày trả thực tế',
    dataIndex: 'actualReturnDate',
    key: 'actualReturnDate',
    width: 150,
    render: (text) => (text ? moment(text).format('DD/MM/YYYY HH:mm') : '—'),
  },
  {
    title: 'Lý do mượn',
    dataIndex: 'description',
    key: 'description',
    width: 250,
    render: (text: string) => {
      if (!text) return '—';
      if (text.length <= 50) return text;

      const shortText = text.slice(0, 30) + '... ';

      return (
        <>
          <Text>{shortText}</Text>
          <Link onClick={() => onViewDetail(text)}>Xem thêm</Link>
        </>
      );
    },
  },
  // Bỏ cột File đính kèm
];

export const rejectedColumns: ColumnsType<Borow.BorrowRecord> = [
  { title: 'Người mượn', dataIndex: 'borrowerName', key: 'borrowerName', width: 150 },
  { title: 'Email', dataIndex: 'borrowerEmail', key: 'borrowerEmail', width: 180 },
  { title: 'SĐT', dataIndex: 'borrowerPhone', key: 'borrowerPhone', width: 130 },
  { title: 'Thiết bị', dataIndex: 'deviceName', key: 'deviceName', width: 180 },
  {
    title: 'Ngày mượn',
    dataIndex: 'borrowDate',
    key: 'borrowDate',
    width: 120,
    render: (text) => moment(text).format('DD/MM/YYYY'),
  },
  {
    title: 'Ngày trả dự kiến',
    dataIndex: 'returnDate',
    key: 'returnDate',
    width: 120,
    render: (text) => moment(text).format('DD/MM/YYYY'),
  },
  {
    title: 'Lý do mượn',
    dataIndex: 'description',
    key: 'description',
    width: 200,
    render: (text: string) => text || '—',
  },
  {
    title: 'Lý do từ chối',
    dataIndex: 'rejectReason',
    key: 'rejectReason',
    width: 200,
    render: (text: string) => text || '—',
  },
  // Bỏ cột File đính kèm
];
