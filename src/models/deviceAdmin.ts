import { useState } from 'react';

export default function DeviceAdminModel() {
	const [data, setData] = useState<DeviceAdmin.Record[]>([]);
	const [visible, setVisible] = useState<boolean>(false);
	const [isEdit, setIsEdit] = useState<boolean>(false);
	const [row, setRow] = useState<DeviceAdmin.Record | null>(null);

	const getDataDevice = () => {
		const dataLocal = JSON.parse(localStorage.getItem('deviceData') || '[]') as DeviceAdmin.Record[];
		setData(dataLocal || []);
	};

	// Hàm thêm thiết bị với logic cộng dồn số lượng nếu trùng deviceName + deviceType + managementUnit
	const addDevice = (device: Omit<DeviceAdmin.Record, 'id'>) => {
		const existIndex = data.findIndex(
			(d) =>
				d.deviceName === device.deviceName &&
				d.deviceType === device.deviceType &&
				d.managementUnit === device.managementUnit,
		);

		let newData = [];

		if (existIndex >= 0) {
			newData = [...data];
			newData[existIndex].quantity += device.quantity;
		} else {
			const maxId = data.length ? Math.max(...data.map((d) => d.id)) : 0;
			newData = [...data, { ...device, id: maxId + 1 }];
		}

		setData(newData);
		localStorage.setItem('deviceData', JSON.stringify(newData));
	};

	const updateDevice = (device: DeviceAdmin.Record) => {
		const newData = data.map((item) => (item.id === device.id ? device : item));
		setData(newData);
		localStorage.setItem('deviceData', JSON.stringify(newData));
	};

	const deleteDevice = (id: number) => {
		const newData = data.filter((item) => item.id !== id);
		setData(newData);
		localStorage.setItem('deviceData', JSON.stringify(newData));
	};

	return {
		data,
		visible,
		setVisible,
		row,
		setRow,
		isEdit,
		setIsEdit,
		setData,
		getDataDevice,
		addDevice,
		updateDevice,
		deleteDevice,
	};
}
