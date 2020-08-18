import api from "../utils/apiUtils";

const SAVE_SERVER = "/api/save";

// post 저장
export const save = (data) => {
  return api.post(`${SAVE_SERVER}/saved`, data);
};

// post 저장 취소
export const unSave = (data) => {
  return api.post(`${SAVE_SERVER}/unsaved`, data);
};

// save 상태 확인
export const checkSave = (data) => {
  return api.post(`${SAVE_SERVER}/check`, data);
};
