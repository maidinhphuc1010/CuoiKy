import React, { useEffect } from 'react';
import { Button, Modal, Table, message } from 'antd';
import { useModel } from 'umi';
import type { ColumnsType } from 'antd/es/table';
import StudentAdminForm from './StudentAdminForm';

const { confirm } = Modal;

const StudentAdmin: React.FC = () => {
	const { data, getDataUser, setRow, isEdit, setVisible, setIsEdit, visible } = useModel('studentAdmin');

	useEffect(() => {
		getDataUser();
	}, []);

	const showDeleteConfirm = (record: RandomUser.Record) => {
		confirm({
			title: 'Xác nhận',
			content: 'Bạn có chắc chắn muốn xóa sinh viên này không?',
			okText: 'Có',
			okType: 'danger',
			cancelText: 'Không',
			onOk() {
				const dataLocal: RandomUser.Record[] = JSON.parse(localStorage.getItem('data') || '[]');
				const newData = dataLocal.filter((item) => item.studentId !== record.studentId);
				localStorage.setItem('data', JSON.stringify(newData));
				getDataUser();
				message.success('Xóa sinh viên thành công');
			},
		});
	};

	const columns: ColumnsType<RandomUser.Record> = [
		{ title: 'Họ và tên', dataIndex: 'fullName', key: 'fullName', width: 150 },
		{ title: 'Ngày sinh', dataIndex: 'dateOfBirth', key: 'dateOfBirth', width: 110 },
		{ title: 'Mã sinh viên', dataIndex: 'studentId', key: 'studentId', width: 130 },
		{ title: 'Lớp', dataIndex: 'className', key: 'className', width: 100 },
		{ title: 'Email', dataIndex: 'email', key: 'email', width: 180 },
		{ title: 'Số điện thoại', dataIndex: 'phoneNumber', key: 'phoneNumber', width: 130 },
		{ title: 'Địa chỉ', dataIndex: 'address', key: 'address', width: 200 },
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
				Thêm sinh viên
			</Button>

			<Table rowKey='studentId' dataSource={data} columns={columns} pagination={{ pageSize: 8 }} scroll={{ x: 1200 }} />

			<Modal
				title={isEdit ? 'Chỉnh sửa sinh viên' : 'Thêm sinh viên'}
				visible={visible}
				footer={null}
				onCancel={() => setVisible(false)}
				destroyOnClose
				width={600}
			>
				<StudentAdminForm />
			</Modal>
		</div>
	);
};

export default StudentAdmin;
