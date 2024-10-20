// Represents a response returning data.
export class DataResponse<T> {
  public success: boolean;
  public data: T;

  constructor(data: T) {
    this.success = true;
    this.data = data;
  }
}

// Represents a response returning no useful data.
export class EmptyResponse {
  public success: boolean;

  constructor() {
    this.success = true;
  }
}

// Represents a response returning paginated data.
export class PagedDataResponse<T> {
  public success: boolean;
  public data: T[];
  public metadata: PagedDataResponse.PageMetadata;

  constructor(data: T[], metadata: PagedDataResponse.PageMetadata) {
    this.success = true;
    this.data = data;
    this.metadata = metadata;
  }
}

export namespace PagedDataResponse {
  // Paging metadata
  export class PageMetadata {
    public page: number;
    public per: number;
    public total: number;

    constructor(page: number, per: number, total: number) {
      this.page = page;
      this.per = per;
      this.total = total;
    }
  }
}
