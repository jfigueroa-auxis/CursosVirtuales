export type Func<T, R> = (t: T) => R;
export type BiFunc<T, U, R> = (t: T, u: U) => R;
export type Supplier<T> = () => T;
export type Consumer<T> = (accept: T) => void;

export interface IIterable<T> {
  iterate: (accept: Consumer<T>) => void;
}


export interface INode<T> {
  value: T;
  next?: INode<T>;
  previous?: INode<T>;
  index?: number;
}

export class LinkedList<T> implements IIterable<T> {
  private readonly EMPTY_NODE: INode<T> = { value: null, next: null };
  private head: INode<T> = null;
  private tail: INode<T> = null;

  public getHead = (): INode<T> => this.head;
  public getTail = (): INode<T> => this.tail;

  public insert = (value: T): LinkedList<T> => {
    const node = this.forgeNode(value);

    node.next = this.head;
    if (this.head) {
      this.head.previous = node;
    }

    this.head = node;

    if (!this.tail) {
      this.tail = node;
    }

    return this;
  };

  public append = (value: T): LinkedList<T> => {
    const node = this.forgeNode(value);

    if (this.isEmpty()) {
      this.head = node;
      this.tail = node;
      node.index = 0;
      return this;
    }

    this.appendToTheEndOfTheList(node);
    return this;
  };

  public delete = (value: T): boolean => {
    let deleted: boolean = false;
    if (this.isEmpty()) {
      return deleted;
    }

    deleted = this.deleteFromHead(value);

    let current = this.head || this.EMPTY_NODE;
    while (current.next) {
      if (current.next.value === value) {
        deleted = true;
        if (current.next.next && current.next.next.previous) {
          current.next.next.previous = current;
        }
        current.next = current.next.next;
      } else {
        current = current.next;
      }
    }

    if (this.tail.value === value) {
      this.tail = current;
    }
    return deleted;
  };

  public find = (compare: Func<T, boolean>): INode<T> => {
    if (this.isEmpty()) {
      return null;
    }

    let node = this.head;
    while (node) {
      if (compare(node.value)) {
        return node;
      }
      node = node.next;
    }
    return null;
  };

  public fromArray = (values: T[]): LinkedList<T> => {
    values.forEach(v => this.append(v));
    return this;
  };

  public toArray = (): T[] => {
    const result: T[] = [];
    this.iterate(_ => result.push(_));
    return result;
  };

  public size = (): number => {
    let listSize = 0;
    this.iterate(_ => listSize++);
    return listSize;
  };

  public isEmpty = () => !this.head;

  public *items() {
    let node = this.head;
    while (node) {
      yield node;
      node = node.next;
    }
  }

  public iterate = (accept: Consumer<T>) => {
    let node = this.head;
    while (node) {
      accept(node.value);
      node = node.next;
    }
  };

  public elementAt = (index: number): INode<T> => {
    let node = this.head;
    let count = 0;
    while (node && count < index) {
      node = node.next;
      count++;
    }
    return node;
  }

  private deleteFromHead = (value: T): boolean => {
    let deleted: boolean = false;
    while (this.head && this.head.value === value) {
      deleted = true;
      this.head = this.head.next;
      if (this.head) {
        this.head.previous = null;
      }
    }
    return deleted;
  };

  private forgeNode = (value: T): INode<T> => {
    return { value, next: null, previous: null };
  };

  private appendToTheEndOfTheList = (node: INode<T>) => {
    node.previous = this.tail;
    node.index = node.previous.index + 1;
    this.tail.next = node;
    this.tail = node;
  };
}
