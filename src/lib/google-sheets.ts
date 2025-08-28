// Google Sheets Integration Service

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwjyMh_cTIj6lZnYqBtxX9p19SMK_DaOaUCV_AWJpR9nqfwKFSGQe9MalcHGRzOG2ca9w/exec';

export interface SheetData {
  name: string;
  email: string;
  clockIn: string;
  clockOut?: string;
  date: string;
  totalHours?: string;
}

export const submitToGoogleSheet = async (data: SheetData): Promise<boolean> => {
  try {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('clockIn', data.clockIn);
    if (data.clockOut) {
      formData.append('clockOut', data.clockOut);
    }
    formData.append('date', data.date);
    if (data.totalHours) {
      formData.append('totalHours', data.totalHours);
    }

    const response = await fetch(SCRIPT_URL, {
      method: 'POST',
      body: formData,
      mode: 'cors'
    });

    if (response.ok) {
      console.log('Success! Data submitted to Google Sheets');
      return true;
    } else {
      console.error('Error submitting to Google Sheets:', response.statusText);
      return false;
    }
  } catch (error) {
    console.error('Error submitting to Google Sheets:', error);
    return false;
  }
};

export const calculateTotalHours = (clockIn: string, clockOut: string): string => {
  const start = new Date(clockIn);
  const end = new Date(clockOut);
  const diffMs = end.getTime() - start.getTime();
  const diffHours = diffMs / (1000 * 60 * 60);
  return diffHours.toFixed(2);
};