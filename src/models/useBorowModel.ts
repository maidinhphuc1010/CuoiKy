import { useState } from 'react';

export default function useBorowModel() {
  const [data, setData] = useState<Borow.BorrowRecord[]>([]);

  // Lấy dữ liệu từ localStorage an toàn hơn, tránh lỗi JSON parse
  const getDataBorow = async () => {
    try {
      const raw = localStorage.getItem('borrowData');
      if (raw) {
        const dataLocal = JSON.parse(raw) as Borow.BorrowRecord[];
        setData(dataLocal);
      } else {
        setData([]);
      }
    } catch (error) {
      console.error('Lỗi khi đọc dữ liệu borrowData từ localStorage:', error);
      setData([]);
    }
  };

  // Lưu dữ liệu, loại bỏ trường attachmentUrl do có thể nặng, xử lý lỗi bộ nhớ đầy
  const saveData = (newData: Borow.BorrowRecord[]) => {
    const dataToStore = newData.map(({ attachmentUrl, attachmentName, ...rest }) => rest);
    setData(newData);
    try {
      localStorage.setItem('borrowData', JSON.stringify(dataToStore));
    } catch (e) {
      if (e instanceof DOMException && e.name === 'QuotaExceededError') {
        alert('Bộ nhớ trình duyệt đã đầy. Vui lòng xóa bớt dữ liệu hoặc giảm kích thước file đính kèm.');
      } else {
        throw e;
      }
    }
  };

  const addBorowRecord = (record: Borow.BorrowRecord) => {
    saveData([record, ...data]);
  };

  const updateBorowRecord = (record: Borow.BorrowRecord) => {
    const newData = data.map(item => (item.id === record.id ? record : item));
    saveData(newData);
  };

  const deleteBorowRecord = (id: number) => {
    const newData = data.filter(item => item.id !== id);
    saveData(newData);
  };

  return {
    data,
    getDataBorow,
    addBorowRecord,
    updateBorowRecord,
    deleteBorowRecord,
    setData,
  };
}
