// Storage 인터페이스를 정의하여 setItem, getItem, removeItem 메서드를 포함
interface StorageInterface {
  setItem(key: string, value: string): void;
  getItem(key: string): string | null;
  removeItem(key: string): void;
}

// Storage 객체를 받아서 StorageInterface 타입의 객체를 반환하는 함수
const StorageBuilder = (storage: Storage): StorageInterface => ({
  // 주어진 키와 값으로 항목을 설정
  setItem: (key: string, value: string): void => storage.setItem(key, value),
  // 주어진 키로 항목을 가져옴
  getItem: (key: string): string | null => storage.getItem(key),
  // 주어진 키로 항목을 제거
  removeItem: (key: string): void => storage.removeItem(key),
});

// localStorage와 sessionStorage를 관리하는 storageService 객체를 생성
export const storageService = {
  local: StorageBuilder(window.localStorage), // 로컬 스토리지에 대한 인터페이스
  session: StorageBuilder(window.sessionStorage), // 세션 스토리지에 대한 인터페이스
};
