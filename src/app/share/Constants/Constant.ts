export class Constant {
  public static readonly TOKEN = 'jwt';
  public static readonly ROLES: Record<string, number> = {
    SystemAdmin: 0,
    Admin: 1,
    PO: 2,
    PM: 3,
    SU: 4,
    Member: 5,
  };
  public static readonly DEFAULT_AVATAR = 'assets/image/cute_avatar.png';

  public static readonly MESSAGE_DELETE_SUCCESS = 'Xóa thành công';
  public static readonly MESSAGE_ADD_SUCCESS = 'Tạo mới thành công';
  public static readonly MESSAGE_SERVICE_ERROR = 'Lỗi dữ liệu';
  public static readonly MESSAGE_UPDATE_SUCCESS = 'Cập nhật thành công';
  public static readonly SUCCESS = 'success';
  public static readonly WAREHOUSE_ID = 'selected_warehouse_id';
  public static readonly WAREHOUSE_MASTER = 'is_warehouse_master';
  public static readonly ERROR = 'error';
  public static readonly WARNING = 'warning';
  public static readonly ACTION = 'action';
  public static readonly USER_INFO = 'user';
  public static readonly LOGIN_FAIL = 'Incorrect username and/or password.';
  public static readonly DELETE = 'Xóa';
  public static readonly CREATE = 'Thêm';
  public static readonly UPDATE = 'Sửa';
  public static readonly RANDOM_COLOR = [
    '#2da844',
    '#2454DF',
    '#5ee6d1',
    '#db4027',
    '#e6bd19',
    '#9592f5',
    '#498bd9',
    '#70b944',
    '#eac1c1',
    '#00ffb1',
    '#159663',
    '#3a2c00',
  ];
}

export class UrlConstant {
  public static readonly USER = '/api/User';
  public static readonly CHART = '/api/Chart';
  public static readonly LOGIN = '/api/Login';
  public static readonly PROJECT = '/api/Project';
  public static readonly POSITION = '/api/Position';
  public static readonly ISSUE = '/api/Issue';
  public static readonly BACKLOG = '/api/Backlog';
  public static readonly SPRINT_BACKLOG = '/api/SprintBacklog';
  public static readonly SPRINT = '/api/Sprint';
  public static readonly TASK = '/api/TaskSprint';
  public static readonly UPLOAD = '/api/Upload';
}
