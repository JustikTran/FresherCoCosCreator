import { readLocalFile, writeLocalFile } from "../utils/data.util.ts";
import type User from "../utils/types/user.d.ts";
export class UserService {
  data: string;

  constructor() {
    this.data = "member.json";
  }

  async addNew(member: User): Promise<void> {
    let members = await readLocalFile(this.data);
    let id: number = members.length === 0 ? 1 : members.length + 1;
    member.id = id;
    let newMember = { ...member };
    members.push(newMember);
    await writeLocalFile(members, this.data);
    console.log("Add success!");
  }

  async find(id: number): Promise<User | undefined> {
    let members: User[] = await readLocalFile(this.data);
    const member: User | undefined = members.find((m: User)=> m.id === id);

    console.log(member, members);
    
    return member;
  }
}
