export interface Posts {
  _id: string;
  title: string;
  description: string;
  image: {
    url: string;
    public_id: string;
  };
  category: string;
  readTime: string;
  updatedAt: string;
  createdAt: string;
  user: {
    _id: string;
    name: string;
    images: {
      public_id: string;
      url: string;
    };
  };
}
