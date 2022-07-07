export class Book {
  id: number;
  createdAt?: Date | number;
  updatedAt?: Date | number;
  title: string;
  publisher?: string;
  author_id: number;


  constructor(init?: any) {
    if (init.id) this.id = init.id;
    if (init.created_at) this.createdAt = init.created_at || null;
    if (init.updated_at) this.updatedAt = init.updated_at || null;
    if (init.title) this.title = init.title || '';
    if (init.publisher) this.publisher = init.publisher || '';
    if (init.author_id) this.author_id = init.author_id || null;
  }

}
