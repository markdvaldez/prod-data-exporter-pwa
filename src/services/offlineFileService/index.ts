import localforage from "localforage";
const dbName = "runners-qc-app-offline-files";

class OfflineFileService {
  private db: LocalForage;

  constructor() {
    this.db = localforage.createInstance({ name: dbName });
  }

  async save(key: string, file: File) {
    try {
      await this.db.setItem(key, file);
    } catch (error) {}
  }

  async get(key: string): Promise<File | null> {
    try {
      return await this.db.getItem<File>(key);
    } catch (error) {
      return null;
    }
  }

  async remove(key: string): Promise<void> {
    try {
      await this.db.removeItem(key);
    } catch (error) {}
  }
}

export const offlineFileService = new OfflineFileService();
