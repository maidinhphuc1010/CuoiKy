declare namespace Borow {
  export type BorrowStatus = 'waiting' | 'borrowing' | 'returned' | 'rejected' | 'overdue';

  export interface BorrowRecord {
    id: number;
    borrowerName: string;
    borrowerEmail: string;
    borrowerPhone: string;
    deviceName: string;
    borrowDate: string;
    returnDate: string;
    actualReturnDate?: string;
    status: BorrowStatus;
    description?: string;
    rejectReason?: string;
    attachmentUrl?: string;
    attachmentName?: string;
  }
}
