import { FileFolder } from '../services/storage.service';
export interface TreeNode<T = any> {
  label?: string;
  data?: T;
  icon?: string;
  expandedIcon?: any;
  collapsedIcon?: any;
  children?: TreeNode<T>[];
  leaf?: boolean;
  expanded?: boolean;
  type?: string;
  parent?: TreeNode<T>;
  partialSelected?: boolean;
  styleClass?: string;
  draggable?: boolean;
  droppable?: boolean;
  selectable?: boolean;
  key?: string;
  path?: string;
  size?: string;
  mimetype?: string;
}

export class Utils {
  static createPathFromType(type: string): string {
    if (type) {
      const fileType = type.split('/')[0];
      return fileType[0].toUpperCase() + fileType.slice(1);
    } else {
      return 'Others';
    }
  }
  static mapToTreeNode(data: FileFolder): TreeNode {
    return {
      label: data.name,
      expandedIcon: data.mimetype
        ? this.getFileIcon(data)
        : 'pi pi-folder-open',
      collapsedIcon: data.mimetype ? this.getFileIcon(data) : 'pi pi-folder',
      children: data.children ? this.mapToTreeNodes(data.children) : [],
      path: data.path,
      size: data.size,
      mimetype: data.mimetype,
      draggable: true,
      droppable: true,
    };
  }

  static mapToTreeNodes(data: FileFolder[]): TreeNode[] {
    return data.map((item) => this.mapToTreeNode(item));
  }

  static getFileIcon(file: FileFolder): string {
    if (file.mimetype.includes('image')) {
      return 'pi pi-image';
    } else if (file.mimetype.includes('audio')) {
      return 'pi pi-volume-up';
    } else if (file.mimetype.includes('video')) {
      return 'pi pi-video';
    } else if (file.mimetype.includes('pdf')) {
      return 'pi pi-file-pdf';
    } else if (file.mimetype.includes('excel')) {
      return 'pi pi-file-excel';
    } else {
      return 'pi pi-file';
    }
  }

  static createFacebookScopes(scopes: string[]) {
    return scopes.join(',');
  }
}
