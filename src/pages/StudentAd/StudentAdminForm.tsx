import React, { useEffect } from 'react';
import { Form, Input, Button, DatePicker, message } from 'antd';
import moment from 'moment';
import { useModel } from 'umi';

const StudentAdminForm: React.FC = () => {
	const { data, getDataUser, row, isEdit, setVisible } = useModel('studentAdmin');
	const [form] = Form.useForm();

	useEffect(() => {
		if (row) {
			form.setFieldsValue({
				...row,
				dateOfBirth: moment(row.dateOfBirth, 'YYYY-MM-DD'),
			});
		} else {
			form.resetFields();
		}
	}, [row, form]);

	const onFinish = (values: any) => {
		const student = {
			...values,
			dateOfBirth: values.dateOfBirth.format('YYYY-MM-DD'),
		};

		if (isEdit) {
			const index = data.findIndex((item) => item.studentId === row?.studentId);
			if (index >= 0) {
				const newData = [...data];
				newData.splice(index, 1, student);
				localStorage.setItem('data', JSON.stringify(newData));
				message.success('Cập nhật sinh viên thành công');
			}
		} else {
			if (data.some((item) => item.studentId === student.studentId)) {
				message.error('Mã sinh viên đã tồn tại!');
				return;
			}
			const newData = [student, ...data];
			localStorage.setItem('data', JSON.stringify(newData));
			message.success('Thêm sinh viên thành công');
		}
		setVisible(false);
		getDataUser();
	};

	return (
		<Form form={form} layout='vertical' onFinish={onFinish} preserve={false}>
			<Form.Item label='Họ và tên' name='fullName' rules={[{ required: true, message: 'Vui lòng nhập họ và tên' }]}>
				<Input />
			</Form.Item>

			<Form.Item
				label='Ngày sinh'
				name='dateOfBirth'
				rules={[
					{ required: true, message: 'Vui lòng chọn ngày sinh' },
					{
						validator: (_, value) => {
							if (!value) return Promise.reject('Vui lòng chọn ngày sinh');
							if (value.isAfter(moment())) {
								return Promise.reject('Ngày sinh không được lớn hơn ngày hiện tại');
							}
							const age = moment().diff(value, 'years');
							if (age < 18) {
								return Promise.reject('Sinh viên phải từ 18 tuổi trở lên');
							}
							return Promise.resolve();
						},
					},
				]}
			>
				<DatePicker format='YYYY-MM-DD' style={{ width: '100%' }} />
			</Form.Item>

			<Form.Item
				label='Mã sinh viên'
				name='studentId'
				rules={[{ required: true, message: 'Vui lòng nhập mã sinh viên' }]}
			>
				<Input disabled={isEdit} />
			</Form.Item>

			<Form.Item label='Lớp' name='className' rules={[{ required: true, message: 'Vui lòng nhập lớp' }]}>
				<Input />
			</Form.Item>

			<Form.Item
				label='Email'
				name='email'
				rules={[
					{ required: true, message: 'Vui lòng nhập email' },
					{ type: 'email', message: 'Email không hợp lệ' },
				]}
			>
				<Input />
			</Form.Item>

			<Form.Item
				label='Số điện thoại'
				name='phoneNumber'
				rules={[
					{ required: true, message: 'Vui lòng nhập số điện thoại' },
					{ pattern: /^[0-9]{9,15}$/, message: 'Số điện thoại phải từ 9 đến 15 chữ số' },
				]}
			>
				<Input />
			</Form.Item>

			<Form.Item label='Địa chỉ' name='address' rules={[{ required: true, message: 'Vui lòng nhập địa chỉ' }]}>
				<Input />
			</Form.Item>

			<Form.Item style={{ textAlign: 'right' }}>
				<Button htmlType='submit' type='primary' style={{ marginRight: 8 }}>
					{isEdit ? 'Lưu' : 'Thêm'}
				</Button>
				<Button onClick={() => setVisible(false)}>Hủy</Button>
			</Form.Item>
		</Form>
	);
};

export default StudentAdminForm;
