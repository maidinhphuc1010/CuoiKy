import { useState } from 'react';

export default function useStudentModel() {
	const [data, setData] = useState<RandomUser.Record[]>([]);
	const [visible, setVisible] = useState<boolean>(false);
	const [isEdit, setIsEdit] = useState<boolean>(false);
	const [row, setRow] = useState<RandomUser.Record | null>(null);

	// Lấy dữ liệu từ localStorage hoặc từ API (getData)
	const getDataUser = async () => {
		const dataLocal = JSON.parse(localStorage.getItem('data') || '[]') as RandomUser.Record[];
		if (!dataLocal?.length) {
			// Giả sử bạn có API getData() trả về { data: RandomUser.Record[] }
			// Nếu không, bạn có thể bỏ phần này hoặc khởi tạo mảng rỗng
			// const res = await getData();
			// localStorage.setItem('data', JSON.stringify(res?.data ?? []));
			// setData(res?.data ?? []);
			setData([]);
			return;
		}
		setData(dataLocal);
	};

	// Thêm mới sinh viên
	const addStudent = (student: RandomUser.Record) => {
		const newData = [...data, student];
		setData(newData);
		localStorage.setItem('data', JSON.stringify(newData));
	};

	// Cập nhật sinh viên (dựa theo studentId)
	const updateStudent = (student: RandomUser.Record) => {
		const newData = data.map((item) => (item.studentId === student.studentId ? student : item));
		setData(newData);
		localStorage.setItem('data', JSON.stringify(newData));
	};

	// Xóa sinh viên (dựa theo studentId)
	const deleteStudent = (studentId: string) => {
		const newData = data.filter((item) => item.studentId !== studentId);
		setData(newData);
		localStorage.setItem('data', JSON.stringify(newData));
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
		getDataUser,
		addStudent,
		updateStudent,
		deleteStudent,
	};
}
