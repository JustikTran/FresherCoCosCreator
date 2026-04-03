
export class DbContext {
  constructor(dbFileUrl) {
    this.dbUrl = dbFileUrl;
    this.listDatas = [
    ];
  }

  async connect() {
    if (!this.dbUrl || typeof this.dbUrl !== "string") {
      throw new Error("DbException: Cannot found data storage.");
    }

    return await fetch(this.dbUrl);
  }

  async findOne(id) {
    let listDatas = await this.connect();
    for (const item of listDatas) {
      if (item.id === id) {
        return item;
      }
    }

    return null;
  }

  async findAll() {
    // return await this.connect();
    return this.listDatas;
  }

  async createOne(item) {
    let listDatas = await this.connect();
  }

  async updateOne(id, item) {
    let listDatas = await this.findOne(id);
  }

  async deleteOne(id) {
    let listDatas = await this.findOne(id);
  }
}
