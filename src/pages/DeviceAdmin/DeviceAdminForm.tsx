import { useEffect } from 'react';
import { Form, Input, Button, InputNumber, Select, message } from 'antd';
import { useModel } from 'umi';

const deviceTypes = [
	{ label: 'Máy tính', value: 'may-tinh' },
	{ label: 'Điện thoại', value: 'dien-thoai' },
	{ label: 'Máy in', value: 'may-in' },
	{ label: 'Máy chiếu', value: 'may-chieu' },
];

const managementUnits = [
	{ label: 'Phòng IT', value: 'phong-it' },
	{ label: 'Phòng Kế toán', value: 'phong-ke-toan' },
	{ label: 'Phòng Hành chính', value: 'phong-hanh-chinh' },
];

const DeviceAdminForm = ({ onFinish }: { onFinish: () => void }) => {
	const { row, isEdit, addDevice, updateDevice, setVisible, getDataDevice } = useModel('deviceAdmin');
	const [form] = Form.useForm();

	useEffect(() => {
		if (row) {
			form.setFieldsValue(row);
		} else {
			form.resetFields();
		}
	}, [row, form]);

	const onSubmit = (values: Omit<DeviceAdmin.Record, 'id'>) => {
		if (isEdit && row) {
			updateDevice({ ...values, id: row.id });
			message.success('Cập nhật thiết bị thành công');
		} else {
			addDevice(values);
			message.success('Thêm thiết bị thành công (hoặc đã cộng dồn số lượng nếu trùng)');
		}
		setVisible(false);
		getDataDevice();
	};

	return (
		<Form form={form} layout='vertical' onFinish={onSubmit} preserve={false}>
			<Form.Item
				label='Tên thiết bị'
				name='deviceName'
				rules={[{ required: true, message: 'Vui lòng nhập tên thiết bị' }]}
			>
				<Input />
			</Form.Item>

			<Form.Item
				label='Loại thiết bị'
				name='deviceType'
				rules={[{ required: true, message: 'Vui lòng chọn loại thiết bị' }]}
			>
				<Select options={deviceTypes} placeholder='Chọn loại thiết bị' />
			</Form.Item>

			<Form.Item label='Số lượng' name='quantity' rules={[{ required: true, message: 'Vui lòng nhập số lượng' }]}>
				<InputNumber min={0} style={{ width: '100%' }} />
			</Form.Item>

			<Form.Item
				label='Đơn vị quản lý'
				name='managementUnit'
				rules={[{ required: true, message: 'Vui lòng chọn đơn vị quản lý' }]}
			>
				<Select options={managementUnits} placeholder='Chọn đơn vị quản lý' />
			</Form.Item>

			<Form.Item label='Mô tả' name='description' rules={[{ required: true, message: 'Vui lòng nhập mô tả' }]}>
				<Input.TextArea rows={3} />
			</Form.Item>

			<Form.Item style={{ textAlign: 'right' }}>
				<Button type='primary' htmlType='submit' style={{ marginRight: 8 }}>
					{isEdit ? 'Lưu' : 'Thêm'}
				</Button>
				<Button onClick={() => setVisible(false)}>Hủy</Button>
			</Form.Item>
		</Form>
	);
};

export default DeviceAdminForm;
