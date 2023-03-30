export class Constant {
    public static readonly TOKEN = "jwt";
    public static readonly ROLES : Record<string, number> = {
      SystemAdmin : 0,
      Admin : 1,
      PO : 2,
      PM : 3,
      SU : 4,
      Member : 5
    };
  public static readonly DEFAULT_AVATAR = "assets/image/cute_avatar.png";
}

export class UrlConstant{
    public static readonly USER ="/api/User";
    public static readonly LOGIN ="/api/Login";
    public static readonly PROJECT ="/api/Project";
    public static readonly ISSUE ="/api/Issue";
    public static readonly BACKLOG ="/api/Backlog";
    public static readonly SPRINT_BACKLOG ="/api/SprintBacklog";
    public static readonly SPRINT ="/api/Sprint";
    public static readonly TASK ="/api/TaskSprint";
    public static readonly UPLOAD ="/api/Upload";
}
