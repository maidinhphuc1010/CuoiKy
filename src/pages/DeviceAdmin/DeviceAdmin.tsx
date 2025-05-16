import React, { useEffect, useState } from 'react';
import { Button, Modal, Table, message } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { useModel } from 'umi';
import DeviceAdminForm from './DeviceAdminForm';

const { confirm } = Modal;

const DeviceAdmin: React.FC = () => {
	const { data, getDataDevice, setRow, isEdit, setVisible, setIsEdit, visible, deleteDevice } = useModel('deviceAdmin');

	// State hiện mô tả chi tiết
	const [descVisible, setDescVisible] = useState(false);
	const [descContent, setDescContent] = useState<string>('');
	const [descTitle, setDescTitle] = useState<{ deviceName: string; managementUnit: string } | null>(null);

	useEffect(() => {
		getDataDevice();
	}, []);

	const showDeleteConfirm = (record: DeviceAdmin.Record) => {
		confirm({
			title: 'Xác nhận',
			content: 'Bạn có chắc chắn muốn xóa thiết bị này không?',
			okText: 'Có',
			okType: 'danger',
			cancelText: 'Không',
			onOk() {
				deleteDevice(record.id);
				message.success('Xóa thiết bị thành công');
			},
		});
	};

	// Hàm mở modal mô tả chi tiết
	const showDescription = (record: DeviceAdmin.Record) => {
		setDescContent(record.description);
		setDescTitle({ deviceName: record.deviceName, managementUnit: record.managementUnit });
		setDescVisible(true);
	};

	const columns: ColumnsType<DeviceAdmin.Record> = [
		{ title: 'Tên thiết bị', dataIndex: 'deviceName', key: 'deviceName', width: 180 },
		{ title: 'Loại thiết bị', dataIndex: 'deviceType', key: 'deviceType', width: 140 },
		{ title: 'Số lượng', dataIndex: 'quantity', key: 'quantity', width: 100 },
		{ title: 'Đơn vị quản lý', dataIndex: 'managementUnit', key: 'managementUnit', width: 160 },
		{
			title: 'Mô tả',
			dataIndex: 'description',
			key: 'description',
			width: 250,
			render: (text: string, record) => {
				const shortDesc = text.length > 60 ? text.slice(0, 50) + '...' : text;
				return (
					<>
						<span>{shortDesc} </span>
						{text.length > 30 && (
							<EyeOutlined style={{ color: '#1890ff', cursor: 'pointer' }} onClick={() => showDescription(record)} />
						)}
					</>
				);
			},
		},
		{
			title: 'Thao tác',
			key: 'action',
			width: 160,
			align: 'center',
			render: (_, record) => (
				<>
					<Button
						onClick={() => {
							setVisible(true);
							setRow(record);
							setIsEdit(true);
						}}
					>
						Sửa
					</Button>
					<Button style={{ marginLeft: 10 }} danger onClick={() => showDeleteConfirm(record)}>
						Xóa
					</Button>
				</>
			),
		},
	];

	return (
		<div>
			<Button
				type='primary'
				style={{ marginBottom: 16 }}
				onClick={() => {
					setVisible(true);
					setIsEdit(false);
					setRow(null);
				}}
			>
				Thêm thiết bị
			</Button>

			<Table rowKey='id' dataSource={data} columns={columns} pagination={{ pageSize: 8 }} scroll={{ x: 1000 }} />

			{/* Modal thêm/sửa thiết bị */}
			<Modal
				title={isEdit ? 'Chỉnh sửa thiết bị' : 'Thêm thiết bị'}
				visible={visible}
				footer={null}
				onCancel={() => setVisible(false)}
				destroyOnClose
				width={600}
			>
				<DeviceAdminForm
					onFinish={() => {
						setVisible(false);
						getDataDevice();
					}}
				/>
			</Modal>

			{/* Modal xem chi tiết mô tả */}
			<Modal
				visible={descVisible}
				footer={null}
				onCancel={() => setDescVisible(false)}
				title='Mô tả chi tiết'
				destroyOnClose
				width={500}
			>
				{descTitle && (
					<p>
						<strong>
							Thiết bị {descTitle.deviceName} do {descTitle.managementUnit} quản lý
						</strong>
					</p>
				)}
				<p style={{ whiteSpace: 'pre-wrap' }}>{descContent}</p>
			</Modal>
		</div>
	);
};

export default DeviceAdmin;
