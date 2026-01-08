/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export enum WorkQueueStatus {
  New = "New",
  Recognized = "Recognized",
  Validated = "Validated",
  Done = "Done",
  RequiresUserUpdate = "RequiresUserUpdate",
  CloseWithoutDocuments = "CloseWithoutDocuments",
  RequiresBackOfficeInput = "RequiresBackOfficeInput",
  FixedByBackOffice = "FixedByBackOffice",
  Removed = "Removed",
}

export enum WorkQueueSortFields {
  Status = "Status",
  DocType = "DocType",
}

export enum WorkQueueDocType {
  None = "None",
  StewardsRuling = "StewardsRuling",
  StewardsRulingCoverPage = "StewardsRulingCoverPage",
  IncidentReport = "IncidentReport",
  NoticeOfStewardsHearing = "NoticeOfStewardsHearing",
  NoticeOfAppeal = "NoticeOfAppeal",
  WaiverOfStewardsHearing = "WaiverOfStewardsHearing",
  HiwuSanctionSummary = "HiwuSanctionSummary",
  StewardsDailyReport = "StewardsDailyReport",
  HumanInjuryReport = "HumanInjuryReport",
  EquineInjuryReport = "EquineInjuryReport",
  EquineInjuryNonRacingReport = "EquineInjuryNonRacingReport",
  InjuryReport = "InjuryReport",
  HorseHealthRecord = "HorseHealthRecord",
  MultiHorseMedication = "MultiHorseMedication",
  HorseMedicalRecordClassification = "HorseMedicalRecordClassification",
  HorseMedicalRecordChanges = "HorseMedicalRecordChanges",
}

export enum VoidReason {
  NA = "NA",
  Administrative = "Administrative",
  Deceased = "Deceased",
  Medical = "Medical",
  Other = "Other",
  PositiveTest = "PositiveTest",
  Vet = "Vet",
}

export enum VetsListReason {
  Epistaxis = "Epistaxis",
  LastStartGt365 = "LastStartGt365",
  NoStartsBefore4YearOld = "NoStartsBefore4YearOld",
  Shockwave = "Shockwave",
  Unsoundness = "Unsoundness",
  Illness = "Illness",
  MedicallyCompromised = "MedicallyCompromised",
  PhysicallyDistressed = "PhysicallyDistressed",
  Injured = "Injured",
  ClenbuterolOrVentipulmin = "ClenbuterolOrVentipulmin",
  IntraArticularInjection = "IntraArticularInjection",
  IntraArticularInjectionWithPAAG = "IntraArticularInjectionWithPAAG",
  IntraArticularInjectionFetlockJoint = "IntraArticularInjectionFetlockJoint",
  Other = "Other",
  ExhaustedHeatStroke = "ExhaustedHeatStroke",
  Admin = "Admin",
  PositiveTestOrOverage = "PositiveTestOrOverage",
  Unknown = "Unknown",
}

export enum VetsListQcStatus {
  None = "None",
  NeedsReview = "NeedsReview",
  Reviewed = "Reviewed",
}

export enum TypeAttributes {
  NotPublic = "NotPublic",
  Public = "Public",
  NestedPublic = "NestedPublic",
  NestedPrivate = "NestedPrivate",
  NestedFamily = "NestedFamily",
  NestedAssembly = "NestedAssembly",
  NestedFamANDAssem = "NestedFamANDAssem",
  VisibilityMask = "VisibilityMask",
  SequentialLayout = "SequentialLayout",
  ExplicitLayout = "ExplicitLayout",
  LayoutMask = "LayoutMask",
  Interface = "Interface",
  Abstract = "Abstract",
  Sealed = "Sealed",
  SpecialName = "SpecialName",
  RTSpecialName = "RTSpecialName",
  Import = "Import",
  Serializable = "Serializable",
  WindowsRuntime = "WindowsRuntime",
  UnicodeClass = "UnicodeClass",
  AutoClass = "AutoClass",
  StringFormatMask = "StringFormatMask",
  HasSecurity = "HasSecurity",
  ReservedMask = "ReservedMask",
  BeforeFieldInit = "BeforeFieldInit",
  CustomFormatMask = "CustomFormatMask",
}

export enum TrackResponseAssessment {
  RequirementMet = "RequirementMet",
  PartiallyMet = "PartiallyMet",
  NotMet = "NotMet",
}

export enum TjcTjcUpdateStatus {
  None = "None",
  Registered = "Registered",
  UpdateNeeded = "UpdateNeeded",
  Error = "Error",
}

export enum TaskStatus {
  Created = "Created",
  WaitingForActivation = "WaitingForActivation",
  WaitingToRun = "WaitingToRun",
  Running = "Running",
  WaitingForChildrenToComplete = "WaitingForChildrenToComplete",
  RanToCompletion = "RanToCompletion",
  Canceled = "Canceled",
  Faulted = "Faulted",
}

export enum TaskCreationOptions {
  None = "None",
  PreferFairness = "PreferFairness",
  LongRunning = "LongRunning",
  AttachedToParent = "AttachedToParent",
  DenyChildAttach = "DenyChildAttach",
  HideScheduler = "HideScheduler",
  RunContinuationsAsynchronously = "RunContinuationsAsynchronously",
}

export enum SortType {
  Category = "Category",
  RuleNumber = "RuleNumber",
  Order = "Order",
  Assessment = "Assessment",
  Comments = "Comments",
}

export enum SecurityRuleSet {
  None = "None",
  Level1 = "Level1",
  Level2 = "Level2",
}

export enum ScratchType {
  Early = "Early",
  Late = "Late",
}

export enum ScratchStatus {
  Posted = "Posted",
  NotPosted = "NotPosted",
  Cancelled = "Cancelled",
}

export enum RulingStatus {
  DecisionOnAppeal = "DecisionOnAppeal",
  OnAppealStayRequested = "OnAppealStayRequested",
  OnAppealStayGranted = "OnAppealStayGranted",
  OnAppealStayDenied = "OnAppealStayDenied",
  OnAppeal = "OnAppeal",
  AppealHearingScheduled = "AppealHearingScheduled",
  DecisionIssued = "DecisionIssued",
  RulingIssued = "RulingIssued",
  AcceptedSanction = "AcceptedSanction",
  ProvisionalSuspension = "ProvisionalSuspension",
  ReverseProvisional = "ReverseProvisional",
  PossibleViolation = "PossibleViolation",
  HearingScheduled = "HearingScheduled",
  IncidentReported = "IncidentReported",
  InAdjudication = "InAdjudication",
  PendingReview = "PendingReview",
  Dismissed = "Dismissed",
  ActionClosed = "ActionClosed",
  AdministrativeError = "AdministrativeError",
  InProcess = "InProcess",
  Enforced = "Enforced",
  Closed = "Closed",
  AppealWithdrawn = "AppealWithdrawn",
  AppealDenied = "AppealDenied",
  DecisionOnCommissionAppeal = "DecisionOnCommissionAppeal",
  NoticeOfSuspectedViolation = "NoticeOfSuspectedViolation",
  DoNotPursue = "DoNotPursue",
  NoticeOfViolation = "NoticeOfViolation",
}

export enum RulingStage {
  EnforcementTeam = "EnforcementTeam",
  Stewards = "Stewards",
  RSC = "RSC",
  IAP = "IAP",
  ArbitralBody = "ArbitralBody",
  BoardPanel = "BoardPanel",
  HISABoard = "HISABoard",
  AdministrativeJudge = "AdministrativeJudge",
  FTC = "FTC",
  FTCALJ = "FTCALJ",
  StewardsHearing = "StewardsHearing",
  StewardsRuling = "StewardsRuling",
  RSCHearing = "RSCHearing",
  RSCRuling = "RSCRuling",
  HISABoardHearing = "HISABoardHearing",
  HISABoardRuling = "HISABoardRuling",
  NSPHearing = "NSPHearing",
  NSPRuling = "NSPRuling",
  ArbitralHearing = "ArbitralHearing",
  ArbitralRuling = "ArbitralRuling",
  BoardPanelHearing = "BoardPanelHearing",
  BoardPanelRuling = "BoardPanelRuling",
  AppealToHISABoardHearing = "AppealToHISABoardHearing",
  AppealToHISABoardRuling = "AppealToHISABoardRuling",
  AppealToAdminJudge = "AppealToAdminJudge",
}

export enum RulingBody {
  HISA = "HISA",
  HIWU = "HIWU",
}

export enum RtrReportType {
  Unspecified = "Unspecified",
  PostLayoff = "PostLayoff",
  WorkOffVetList = "WorkOffVetList",
  MandatoryAttendingVetInspection = "MandatoryAttendingVetInspection",
}

export enum RtrReportStatus {
  Draft = "Draft",
  Submitted = "Submitted",
  UnderReview = "UnderReview",
  AwaitingReply = "AwaitingReply",
  Rejected = "Rejected",
  Scheduling = "Scheduling",
  DateSet = "DateSet",
  Completed = "Completed",
  Failed = "Failed",
  Expired = "Expired",
}

export enum ReportType {
  RSCReport = "RSCReport",
  TrackReport = "TrackReport",
  BoardReport = "BoardReport",
  SummaryWithTrackResponses = "SummaryWithTrackResponses",
}

export enum ReportStatus {
  None = "None",
  PLR = "PLR",
  WOVL = "WOVL",
}

export enum ReportActionAllowed {
  None = "None",
  Add = "Add",
  Edit = "Edit",
}

export enum QuestionnaireObjectType {
  Location = "Location",
  Person = "Person",
}

export enum QuestionPartType {
  Text = "Text",
  TextArea = "TextArea",
  Checkbox = "Checkbox",
  Radio = "Radio",
  File = "File",
  Summary = "Summary",
  Regulation = "Regulation",
  Introduction = "Introduction",
}

export enum QCStatus {
  Awaiting = "Awaiting",
  Reopened = "Reopened",
  Done = "Done",
}

export enum PropertyAttributes {
  None = "None",
  SpecialName = "SpecialName",
  RTSpecialName = "RTSpecialName",
  HasDefault = "HasDefault",
  Reserved2 = "Reserved2",
  Reserved3 = "Reserved3",
  Reserved4 = "Reserved4",
  ReservedMask = "ReservedMask",
}

export enum ProductType {
  All = "All",
  BSampleTest = "BSampleTest",
  HiwuTest = "HiwuTest",
}

export enum PriceOptions {
  LessThanCurrent = "LessThanCurrent",
  More = "More",
  Equal = "Equal",
}

export enum PostLayoffTreatmentKind {
  Unknown = "Unknown",
  Surgery = "Surgery",
  Shockwave = "Shockwave",
  IntraArticularInjection = "IntraArticularInjection",
  Medications = "Medications",
  Procedures = "Procedures",
}

export enum PostLayoffReportStatus {
  Unsubmitted = "Unsubmitted",
  Submitted = "Submitted",
  Pending = "Pending",
  Complete = "Complete",
  Expired = "Expired",
}

export enum PersonScheduleTypeEnum {
  Blood = "Blood",
}

export enum PaymentType {
  Stripe = "Stripe",
  Manual = "Manual",
}

export enum ParameterAttributes {
  None = "None",
  In = "In",
  Out = "Out",
  Lcid = "Lcid",
  Retval = "Retval",
  Optional = "Optional",
  HasDefault = "HasDefault",
  HasFieldMarshal = "HasFieldMarshal",
  Reserved3 = "Reserved3",
  Reserved4 = "Reserved4",
  ReservedMask = "ReservedMask",
}

export enum OrderStatus {
  Paid = "Paid",
  Unpaid = "Unpaid",
  Refund = "Refund",
}

export enum OrderPaymentType {
  All = "All",
  Manual = "Manual",
  Online = "Online",
}

export enum NotificationType {
  Email = "Email",
  Sms = "Sms",
  FrontEndNotificationResponse = "FrontEndNotificationResponse",
  AnsafoneOut = "AnsafoneOut",
  AnsafoneIn = "AnsafoneIn",
  AnsafoneIBIn = "AnsafoneIBIn",
}

export enum NotificationTargetType {
  Person = "Person",
  Track = "Track",
  Role = "Role",
}

export enum MfaRoute {
  EmailAndSMS = "EmailAndSMS",
  SMS = "SMS",
  Email = "Email",
}

export enum MethodImplAttributes {
  IL = "IL",
  Native = "Native",
  OPTIL = "OPTIL",
  CodeTypeMask = "CodeTypeMask",
  ManagedMask = "ManagedMask",
  NoInlining = "NoInlining",
  ForwardRef = "ForwardRef",
  Synchronized = "Synchronized",
  NoOptimization = "NoOptimization",
  PreserveSig = "PreserveSig",
  AggressiveInlining = "AggressiveInlining",
  AggressiveOptimization = "AggressiveOptimization",
  InternalCall = "InternalCall",
  MaxMethodImplVal = "MaxMethodImplVal",
}

export enum MethodAttributes {
  PrivateScope = "PrivateScope",
  Private = "Private",
  FamANDAssem = "FamANDAssem",
  Assembly = "Assembly",
  Family = "Family",
  FamORAssem = "FamORAssem",
  Public = "Public",
  MemberAccessMask = "MemberAccessMask",
  UnmanagedExport = "UnmanagedExport",
  Static = "Static",
  Final = "Final",
  Virtual = "Virtual",
  HideBySig = "HideBySig",
  NewSlot = "NewSlot",
  CheckAccessOnOverride = "CheckAccessOnOverride",
  Abstract = "Abstract",
  SpecialName = "SpecialName",
  RTSpecialName = "RTSpecialName",
  PinvokeImpl = "PinvokeImpl",
  HasSecurity = "HasSecurity",
  RequireSecObject = "RequireSecObject",
  ReservedMask = "ReservedMask",
}

export enum MessageTemplateSenderType {
  HISA = "HISA",
  HIWU = "HIWU",
}

export enum MessageSenderMethod {
  Email = "Email",
  Sms = "Sms",
  Internal = "Internal",
}

export enum MemberTypes {
  Constructor = "Constructor",
  Event = "Event",
  Field = "Field",
  Method = "Method",
  Property = "Property",
  TypeInfo = "TypeInfo",
  Custom = "Custom",
  NestedType = "NestedType",
  All = "All",
}

export enum MedicalSummaryStatus {
  Queued = "Queued",
  Complete = "Complete",
}

export enum MailingAction {
  Read = "Read",
  Unread = "Unread",
  Archive = "Archive",
  Unarchive = "Unarchive",
  Delete = "Delete",
  Undelete = "Undelete",
  Todo = "Todo",
  Undo = "Undo",
  Complete = "Complete",
  Uncomplete = "Uncomplete",
}

export enum MailMessageType {
  Other = "Other",
  HorseTransfer = "HorseTransfer",
  HorseShare = "HorseShare",
  HorseTakeback = "HorseTakeback",
  HorseChangeOwner = "HorseChangeOwner",
  JockeyAgentInviteJockey = "JockeyAgentInviteJockey",
  HorseClaim = "HorseClaim",
  ChangeAttendingVet = "ChangeAttendingVet",
  GetOffVetsList = "GetOffVetsList",
  ShockwaveRequest = "ShockwaveRequest",
  RulingPayment = "RulingPayment",
  HorseRetire = "HorseRetire",
  HorseRequestToBecomeRP = "HorseRequestToBecomeRP",
  VetsList = "VetsList",
}

export enum LocationType {
  Racetrack = "Racetrack",
  TrainingTrack = "TrainingTrack",
  Farm = "Farm",
  Other = "Other",
  StateRacingCommission = "StateRacingCommission",
  Lab = "Lab",
  HISA = "HISA",
  AfterCare = "AfterCare",
  HIWU = "HIWU",
  OwnershipLLC = "OwnershipLLC",
  VetPractice = "VetPractice",
}

export enum LocationScheduleType {
  Meet = "Meet",
  Work = "Work",
}

export enum LocationHisaAgreementStatus {
  InProcess = "InProcess",
  VIA = "VIA",
  None = "None",
  ImpLetter = "ImpLetter",
}

export enum LocationFormType {
  Attestation = "Attestation",
  Compliance = "Compliance",
  Process = "Process",
  General = "General",
  DailyReport = "Daily_report",
  EndOfMeetReport = "EndOfMeetReport",
  ScratchReport = "Scratch_report",
}

export enum LocationContactType {
  GeneralManager = "GeneralManager",
  DirectorOfRacing = "DirectorOfRacing",
  MedicalDirector = "MedicalDirector",
  HeadParamedic = "HeadParamedic",
  HisaAdmin = "HisaAdmin",
  SafetyDirector = "SafetyDirector",
  SafetyOfficer = "SafetyOfficer",
  RegulatoryVeterinarians = "RegulatoryVeterinarians",
  ChiefSteward = "ChiefSteward",
  Stewards = "Stewards",
  RacingSecretary = "RacingSecretary",
  ClaimsClerk = "ClaimsClerk",
  Bookkeeper = "Bookkeeper",
  TrackSuperintendent = "TrackSuperintendent",
  StallSuperintendent = "StallSuperintendent",
  HorseshoeInspector = "HorseshoeInspector",
}

export enum LocationAccreditationStatus {
  Full = "Full",
  Provisional = "Provisional",
  Denied = "Denied",
  Revoked = "Revoked",
  Suspended = "Suspended",
}

export enum LinkStatus {
  New = "New",
  InProcess = "InProcess",
  Processed = "Processed",
}

export enum LayoutKind {
  Sequential = "Sequential",
  Explicit = "Explicit",
  Auto = "Auto",
}

export enum InjuryType {
  Combined = "Combined",
  Horse = "Horse",
  Person = "Person",
}

export enum InjuryPersonRole {
  Outrider = "Outrider",
  Starting = "Starting",
  Gate = "Gate",
  Other = "Other",
  Jockey = "Jockey",
}

export enum InjuryPersonOutcome {
  TakenHospital = "TakenHospital",
  TreatedTrack = "TreatedTrack",
  RefusedTreatment = "RefusedTreatment",
  Died = "Died",
}

export enum InjuryPersonCause {
  RunOverByHorse = "RunOverByHorse",
  FellFromHorse = "FellFromHorse",
  KickedByHorse = "KickedByHorse",
  Other = "Other",
}

export enum InjuryHorseTriageScore {
  S0 = "S0",
  S1 = "S1",
  S2 = "S2",
  S3 = "S3",
  S4 = "S4",
  S5 = "S5",
  NA = "NA",
}

export enum InjuryHorseOutcome {
  Euthanized = "Euthanized",
  Died = "Died",
  UndergoingTreatment = "UndergoingTreatment",
  Unknown = "Unknown",
}

export enum InjuryCircumstance {
  Other = "Other",
  Racing = "Racing",
  Training = "Training",
}

export enum HorseVetClearanceType {
  PostLayoffReport = "PostLayoffReport",
  HorseMedical = "HorseMedical",
  WorkOff = "WorkOff",
}

export enum HorseStatus {
  InTraining = "InTraining",
  Layup = "Layup",
  Retired = "Retired",
  Racing = "Racing",
  Dead = "Dead",
  Autoregistered = "Autoregistered",
}

export enum HorseRetireReason {
  Other = "Other",
  Injury = "Injury",
  Illness = "Illness",
  OwnersRequest = "OwnersRequest",
  DecisionToBreed = "DecisionToBreed",
  Age = "Age",
}

export enum HorseMedicalRouteAdmin {
  Unspecified = "Unspecified",
  IV = "IV",
  IM = "IM",
  Oral = "Oral",
  Cream = "Cream",
  PO = "PO",
  Topical = "Topical",
  NG = "NG",
  SubQ = "SubQ",
  Intralesional = "Intralesional",
  Unknown = "Unknown",
  Inhalation = "Inhalation",
  Transdermal = "Transdermal",
  Ophthalmic = "Ophthalmic",
  Intranasal = "Intranasal",
  IA = "IA",
  Other = "Other",
}

export enum HorseMedicalRecType {
  Vaccine = "Vaccine",
  Treatment = "Treatment",
  Followup = "Followup",
  Exam = "Exam",
  Test = "Test",
  Surgery = "Surgery",
  Other = "Other",
  VetInspection = "VetInspection",
  DrugAdministered = "DrugAdministered",
  Procedure = "Procedure",
  Dental = "Dental",
  Physiotherapy = "Physiotherapy",
  Acupuncture = "Acupuncture",
  Chiropractic = "Chiropractic",
  RaceInspection = "RaceInspection",
  Shockwave = "Shockwave",
  Deworming = "Deworming",
  ClearByRegVet = "ClearByRegVet",
  Retired = "Retired",
  Death = "Death",
  DeathReport = "DeathReport",
  Bisphosphonates = "Bisphosphonates",
  IntraarticularInjection = "IntraarticularInjection",
  IntralesionalInjection = "IntralesionalInjection",
  Endoscopy = "Endoscopy",
  AlternativeTreatments = "AlternativeTreatments",
  DispensedMeds = "DispensedMeds",
  Necropsy = "Necropsy",
  Imaging = "Imaging",
  Inspection = "Inspection",
  MandatoryPreRaceAndPreWorkVetInspection = "MandatoryPreRaceAndPreWorkVetInspection",
}

export enum HorseMedicalPostRaceObservation {
  None = "None",
  Fine = "Fine",
  Unsound = "Unsound",
  Bleed = "Bleed",
  NeedExam = "NeedExam",
  VetsList = "VetsList",
}

export enum HorseDeathReason {
  SuddenDeath = "SuddenDeath",
  EuthanizedInjury = "EuthanizedInjury",
  EuthanizedIllness = "EuthanizedIllness",
  DeathIllness = "DeathIllness",
  DeathInjury = "DeathInjury",
  NotReported = "NotReported",
  AsOfYetUnknown = "AsOfYetUnknown",
}

export enum GroupofNotificationDistribution {
  Person = "Person",
  Track = "Track",
  Role = "Role",
}

export enum GenericParameterAttributes {
  None = "None",
  Covariant = "Covariant",
  Contravariant = "Contravariant",
  VarianceMask = "VarianceMask",
  ReferenceTypeConstraint = "ReferenceTypeConstraint",
  NotNullableValueTypeConstraint = "NotNullableValueTypeConstraint",
  DefaultConstructorConstraint = "DefaultConstructorConstraint",
  SpecialConstraintMask = "SpecialConstraintMask",
}

export enum FieldAttributes {
  PrivateScope = "PrivateScope",
  Private = "Private",
  FamANDAssem = "FamANDAssem",
  Assembly = "Assembly",
  Family = "Family",
  FamORAssem = "FamORAssem",
  Public = "Public",
  FieldAccessMask = "FieldAccessMask",
  Static = "Static",
  InitOnly = "InitOnly",
  Literal = "Literal",
  NotSerialized = "NotSerialized",
  HasFieldRVA = "HasFieldRVA",
  SpecialName = "SpecialName",
  RTSpecialName = "RTSpecialName",
  HasFieldMarshal = "HasFieldMarshal",
  PinvokeImpl = "PinvokeImpl",
  HasDefault = "HasDefault",
  ReservedMask = "ReservedMask",
}

export enum EventAttributes {
  None = "None",
  SpecialName = "SpecialName",
  RTSpecialName = "RTSpecialName",
}

export enum DesignationType {
  HISA = "HISA",
  HIWU = "HIWU",
}

export enum DayOfWeek {
  Sunday = "Sunday",
  Monday = "Monday",
  Tuesday = "Tuesday",
  Wednesday = "Wednesday",
  Thursday = "Thursday",
  Friday = "Friday",
  Saturday = "Saturday",
}

export enum Comparison {
  Equal = "Equal",
  NotEqual = "NotEqual",
}

export enum CommentType {
  UserNote = "UserNote",
  UserComment = "UserComment",
  HisaRecommendation = "HisaRecommendation",
  RscChairFinalComment = "RscChairFinalComment",
}

export enum CanRaceRulesType {
  Vaccine = "Vaccine",
  Test = "Test",
  PaymentReminder = "PaymentReminder",
  ValueСoncusion = "Сoncusion",
  Physical = "Physical",
  CanRace = "CanRace",
}

export enum CanRaceObjectType {
  Person = "Person",
  Horse = "Horse",
}

export enum CallingConventions {
  Standard = "Standard",
  VarArgs = "VarArgs",
  Any = "Any",
  HasThis = "HasThis",
  ExplicitThis = "ExplicitThis",
}

export enum CalledInType {
  Trainer = "Trainer",
  Office = "Office",
  Steward = "Steward",
  AttendingVet = "AttendingVet",
  RegVet = "RegVet",
  Other = "Other",
}

export enum AttestationType {
  Location = "Location",
  Person = "Person",
  Horse = "Horse",
}

export enum Assessment {
  Passed = "Passed",
  RequirementMet = "RequirementMet",
  NotMet = "NotMet",
  PartiallyMet = "PartiallyMet",
  NotAssessed = "NotAssessed",
}

export interface AccessPermission {
  copy?: boolean;
  download?: boolean;
  write?: boolean;
  writeContents?: boolean;
  read?: boolean;
  upload?: boolean;
  message?: string | null;
}

export interface AccreditationAudit {
  auditorAssessment?: Assessment | null;
  reviewNotes?: string | null;
  recommendation?: string[] | null;
  auditorFileNames?: string[] | null;
  auditorAttachments?: FileAttachment[] | null;
}

export interface AccreditationStatusDashboardRequest {
  questionnaireAnswerId?: string | null;
  locationId?: string | null;
  rsaaSubmittedDate?: string | null;
  accreditationVisitStart?: string | null;
  accreditationVisitEnd?: string | null;
  accreditationReviewerRP?: string | null;
  letterSentDate?: string | null;
  waitingLetterResponseNotes?: string | null;
  rscReviewedResponse?: string | null;
  closeoutLetter?: string | null;
  cgRscMtNotes?: string | null;
  isDeleted?: boolean;
  /** @format int32 */
  accreditationYear?: number | null;
  /** @format int32 */
  accreditationCount?: number | null;
}

export interface AccreditationStatusDashboardResponse {
  questionnaireAnswerId?: string | null;
  locationId?: string | null;
  rsaaSubmittedDate?: string | null;
  accreditationVisitStart?: string | null;
  accreditationVisitEnd?: string | null;
  accreditationReviewerRP?: string | null;
  letterSentDate?: string | null;
  waitingLetterResponseNotes?: string | null;
  rscReviewedResponse?: string | null;
  closeoutLetter?: string | null;
  cgRscMtNotes?: string | null;
  isDeleted?: boolean;
  /** @format int32 */
  accreditationYear?: number | null;
  /** @format int32 */
  accreditationCount?: number | null;
  locationName?: string | null;
  /** @format date */
  expires?: string | null;
}

export type ActionResult = object;

export interface ActivityInfo {
  /** @format int32 */
  totalCount?: number;
  records?: {
    Unknown?: HorseActivityRecord;
    Race?: HorseActivityRecord;
    Workout?: HorseActivityRecord;
    MedicalRecord?: HorseActivityRecord;
    VetsList?: HorseActivityRecord;
  } | null;
}

export interface AddAttestationRequest {
  attestationCatalogId?: string | null;
  type?: AttestationType;
  hisaPersonId?: string | null;
  hisaHorseId?: string | null;
  locationId?: string | null;
  notes?: string | null;
}

export interface Address {
  street?: string | null;
  city?: string | null;
  state?: string | null;
  zipPostalCode?: string | null;
  country?: string | null;
  unitAptBoxNumber?: string | null;
}

export interface AddressRequest {
  country?: string | null;
  state?: string | null;
  city?: string | null;
  street?: string | null;
  zipPostalCode?: string | null;
  unitAptBoxNumber?: string | null;
}

export interface AggregateException {
  targetSite?: MethodBase | null;
  data?: Record<string, any>;
  innerException?: Exception | null;
  helpLink?: string | null;
  source?: string | null;
  /** @format int32 */
  hResult?: number;
  stackTrace?: string | null;
  innerExceptions?: Exception[] | null;
  message?: string | null;
}

export interface AllowedToComeOffQuery {
  /** @minItems 1 */
  vetsListIds: string[];
  /** @format date */
  dateToComeOffList?: string | null;
}

export interface AppAccessQuery {
  /** @minLength 1 */
  userId: string;
  /** @minLength 1 */
  appName: string;
}

export interface Assembly {
  definedTypes?: TypeInfo[] | null;
  exportedTypes?: Type[] | null;
  /** @deprecated */
  codeBase?: string | null;
  entryPoint?: MethodInfo | null;
  fullName?: string | null;
  imageRuntimeVersion?: string | null;
  isDynamic?: boolean;
  location?: string | null;
  reflectionOnly?: boolean;
  isCollectible?: boolean;
  isFullyTrusted?: boolean;
  customAttributes?: CustomAttributeData[] | null;
  /** @deprecated */
  escapedCodeBase?: string | null;
  manifestModule?: Module | null;
  modules?: Module[] | null;
  /** @deprecated */
  globalAssemblyCache?: boolean;
  /** @format int64 */
  hostContext?: number;
  securityRuleSet?: SecurityRuleSet;
}

export interface AssortedAutocompleteDto {
  field?: string | null;
  value?: string | null;
  name?: string | null;
  /** @uniqueItems true */
  aka?: string[] | null;
}

export interface AssortedFieldRequest {
  field?: string | null;
  value?: string | null;
  name?: string | null;
  /** @uniqueItems true */
  aka?: string[] | null;
  mgr?: string[] | null;
}

export interface AssortedFieldResponse {
  field?: string | null;
  value?: string | null;
  name?: string | null;
  /** @uniqueItems true */
  aka?: string[] | null;
  mgr?: string[] | null;
}

export interface AssortedFieldSearchDto {
  assortedFieldId?: string | null;
  field?: string | null;
  value?: string | null;
  name?: string | null;
  /** @uniqueItems true */
  aka?: string[] | null;
  mgr?: string[] | null;
}

export interface AttestationAttachmentDto {
  presignedURL?: string | null;
}

export interface AttestationCatalogDto {
  attestationCatalogId?: string | null;
  type?: AttestationType;
  title?: string | null;
  body?: string | null;
  url?: string | null;
}

export interface AttestationCatalogSearchDto {
  attestationCatalogId?: string | null;
  type?: AttestationType;
  title?: string | null;
  body?: string | null;
  url?: string | null;
}

export interface AttestationDto {
  attestationId?: string | null;
  attestationCatalogId?: string | null;
  type?: AttestationType;
  hisaPersonId?: string | null;
  hisaHorseId?: string | null;
  locationId?: string | null;
  title?: string | null;
  body?: string | null;
  notes?: string | null;
  attachmentUrls?: string[] | null;
  /** @format date-time */
  recordCreated?: string;
}

export interface AttributeModel {
  /** @format int32 */
  id?: number;
  type?: string | null;
  /** @format double */
  score?: number;
  /** @format double */
  relationshipScore?: number;
  relationshipType?: string | null;
  /** @format int32 */
  beginOffset?: number;
  /** @format int32 */
  endOffset?: number;
  text?: string | null;
  category?: string | null;
  traits?: string[] | null;
}

export interface AuthGroupRequest {
  /** @uniqueItems true */
  permissions?: string[] | null;
  isSystem?: boolean;
}

export interface AuthGroupResponse {
  /** @uniqueItems true */
  permissions?: string[] | null;
  isSystem?: boolean;
  authGroupId?: string | null;
}

export interface AuthLoginRequest {
  /** @minLength 1 */
  userName: string;
  /** @minLength 1 */
  password: string;
  /** @minLength 1 */
  metaData: string;
}

export interface AuthLoginResponse {
  accessToken?: string | null;
  refreshToken?: string | null;
  message?: string | null;
}

export interface AuthMfaContactRequest {
  /** @minLength 1 */
  username: string;
  /** @minLength 1 */
  mobileNumber: string;
}

export interface AuthMfaContactResponse {
  mobileNumber?: string | null;
  email?: string | null;
}

export interface AuthPermissions {
  hisaPersonId?: string | null;
  horses?: Record<string, string[]>;
  locations?: Record<string, string[]>;
  /** @uniqueItems true */
  general?: string[] | null;
  /** @uniqueItems true */
  generalAuthGroups?: string[] | null;
}

export interface AuthUserGroupRequest {
  /** @minLength 1 */
  objectId: string;
  authGroupIds?: string[] | null;
  /** @format date */
  expiryDate?: string | null;
  notes?: string | null;
}

export interface AuthUserGroupResponse {
  objectId?: string | null;
  authGroupIds?: string[] | null;
  /** @format date */
  expiryDate?: string | null;
  notes?: string | null;
  personId?: string | null;
  objectName?: string | null;
}

export interface BatchActionRequest {
  ids?: string[] | null;
  action?: MailingAction;
}

export interface BillableExpenseRequest {
  /** @format uuid */
  billableExpenseId?: string;
  designationType?: DesignationType;
  productType?: ProductType;
  name?: string | null;
  description?: string | null;
  /** @format double */
  price?: number;
}

export interface BillableExpenseResponse {
  /** @format uuid */
  billableExpenseId?: string;
  designationType?: DesignationType;
  productType?: ProductType;
  name?: string | null;
  description?: string | null;
  /** @format double */
  price?: number;
}

export interface CanRaceHorseResponse {
  id?: string | null;
  canRace?: boolean;
  reason?: string | null;
  canWork?: boolean;
  canWorkReason?: string | null;
  /** @format date */
  date?: string;
  canEnter?: boolean;
  canEnterReason?: string | null;
}

export interface CanRaceModel {
  id?: string | null;
  canRace?: boolean;
  reason?: string | null;
  canWork?: boolean;
  canWorkReason?: string | null;
  /** @format date */
  date?: string;
  canEnter?: boolean;
  canEnterReason?: string | null;
}

export interface CanRacePersonRequest {
  id?: string | null;
  personTypeName?: string | null;
}

export interface CanRacePersonResponse {
  id?: string | null;
  canRace?: boolean;
  reason?: string | null;
  canWork?: boolean;
  canWorkReason?: string | null;
  /** @format date */
  date?: string;
  canEnter?: boolean;
  canEnterReason?: string | null;
}

export interface CanRaceRulesDto {
  /** @format uuid */
  canRaceRuleId?: string;
  /** @format date */
  date?: string;
  objectId?: string | null;
  objectType?: CanRaceObjectType;
  type?: CanRaceRulesType;
  name?: string | null;
  /** @format date */
  expiryDate?: string;
}

export interface CanRaceRulesSearchDto {
  /** @format uuid */
  canRaceRuleId?: string;
  /** @format date */
  date?: string;
  objectId?: string | null;
  objectType?: CanRaceObjectType;
  type?: CanRaceRulesType;
  name?: string | null;
  /** @format date */
  expiryDate?: string;
}

export interface CancelAndCreateClaimRequest {
  locationId?: string | null;
  horseId?: string | null;
  /** @format date */
  claimCancelDate?: string | null;
  initiatingPersonId?: string | null;
  reason?: string | null;
  note?: string | null;
}

export interface CanceledScratchResponse {
  locationId?: string | null;
  /** @format int32 */
  raceNumber?: number;
  /** @format date */
  date?: string;
  cancelReason?: string | null;
  /** @format date-time */
  createdDateTime?: string | null;
  createdByHisaId?: string | null;
  createdByHisaPersonName?: string | null;
}

export interface ChangeHistoryObjectData {
  id?: string | null;
  event?: string | null;
  /** @format date-time */
  modifiedDate?: string;
  /** @format date-time */
  eventTime?: string;
  modifiedBy?: string | null;
  telemetryData?: ChangeHistoryTelemetryData | null;
  data?: Record<string, string>;
}

export interface ChangeHistoryResponseChangeHistoryObjectData {
  rows?: ChangeHistoryObjectData[] | null;
  nextToken?: string | null;
}

export interface ChangeHistoryResponseChangeHistoryRow {
  rows?: ChangeHistoryRow[] | null;
  nextToken?: string | null;
}

export interface ChangeHistoryResponseChangeHistoryRowGrouped {
  rows?: ChangeHistoryRowGrouped[] | null;
  nextToken?: string | null;
}

export interface ChangeHistoryRow {
  id?: string | null;
  event?: string | null;
  /** @format date-time */
  modifiedDate?: string;
  modifiedBy?: string | null;
  measureName?: string | null;
  measureValue?: string | null;
}

export interface ChangeHistoryRowGrouped {
  id?: string | null;
  event?: string | null;
  /** @format date-time */
  modifiedDate?: string;
  /** @format date-time */
  eventTime?: string;
  modifiedBy?: string | null;
  telemetryData?: ChangeHistoryTelemetryData | null;
  measurePairs?: MeasurePair[] | null;
}

export interface ChangeHistoryTelemetryData {
  traceId?: string | null;
  spanId?: string | null;
  traceLink?: ChangeHistoryTelemetryLink | null;
  traceSearchLink?: ChangeHistoryTelemetryLink | null;
  logsLink?: ChangeHistoryTelemetryLink | null;
}

export interface ChangeHistoryTelemetryLink {
  link?: string | null;
  /** @format date-time */
  expiration?: string | null;
}

export interface ChangeHistoryV2Query {
  /**
   * @format int32
   * @min 0
   */
  page?: number;
  /**
   * @format int32
   * @min 0
   * @exclusiveMin true
   * @max 100
   */
  pageSize?: number;
  includeActivities?: boolean;
  /** @format date-time */
  startDate?: string | null;
  /** @format date-time */
  endDate?: string | null;
  isAscSort?: boolean;
}

export interface ChangeHistoryV2Response {
  rows?: ChangeHistoryV2Row[] | null;
}

export interface ChangeHistoryV2Row {
  /** @format date-time */
  activityTime?: string;
  performedBy?: string | null;
  applicationKey?: string | null;
  data?: Record<string, any>;
  telemetryData?: ChangeHistoryV2TelemetryData | null;
}

export interface ChangeHistoryV2TelemetryData {
  spanId?: string | null;
  traceId?: string | null;
  traceLink?: ChangeHistoryV2TelemetryLink | null;
  traceSearchLink?: ChangeHistoryV2TelemetryLink | null;
  logsLink?: ChangeHistoryV2TelemetryLink | null;
}

export interface ChangeHistoryV2TelemetryLink {
  link?: string | null;
  /** @format date-time */
  expiration?: string | null;
}

export interface ClaimHistoryResponse {
  claimHistoryId?: string | null;
  /** @format date-time */
  createdDateTime?: string;
  /** @format date */
  claimDate?: string;
  hisaHorseId?: string | null;
  newDesignactedOwnerId?: string | null;
  newResponsiblePersonId?: string | null;
  oldDesignactedOwnerId?: string | null;
  oldResponsiblePersonId?: string | null;
  race?: string | null;
  trackId?: string | null;
  canceled?: boolean;
  /** @format date */
  canceledDate?: string | null;
  canceledReason?: string | null;
  notes?: string | null;
  hisaHorseName?: string | null;
  newDesignactedOwnerName?: string | null;
  newResponsiblePersonName?: string | null;
  oldDesignactedOwnerName?: string | null;
  oldResponsiblePersonName?: string | null;
  trackName?: string | null;
  trackCode?: string | null;
  /** @format date */
  raceDate?: string | null;
  newOwnershipEntity?: string | null;
  oldOwnershipEntity?: string | null;
  uuid?: string | null;
  activity?: RecordActivity | null;
}

export interface ClaimHistorySearchDto {
  claimHistoryId?: string | null;
  /** @format date-time */
  createdDateTime?: string;
  /** @format date */
  claimDate?: string;
  hisaHorseId?: string | null;
  newDesignactedOwnerId?: string | null;
  newResponsiblePersonId?: string | null;
  oldDesignactedOwnerId?: string | null;
  oldResponsiblePersonId?: string | null;
  race?: string | null;
  trackId?: string | null;
  canceled?: boolean;
  /** @format date */
  canceledDate?: string | null;
  canceledReason?: string | null;
  notes?: string | null;
  hisaHorseName?: string | null;
  newDesignactedOwnerName?: string | null;
  newResponsiblePersonName?: string | null;
  oldDesignactedOwnerName?: string | null;
  oldResponsiblePersonName?: string | null;
  trackName?: string | null;
  trackCode?: string | null;
  /** @format date */
  raceDate?: string | null;
  newOwnershipEntity?: string | null;
  oldOwnershipEntity?: string | null;
  activity?: RecordActivity | null;
  uuid?: string | null;
}

export interface ClaimInspectionModel {
  createdHisapersonId?: string | null;
  /** @format date-time */
  createdDate?: string;
  latLng?: string | null;
  inspectionCooling?: boolean;
  inspectionJog?: boolean;
  inspectionGeneral?: boolean;
  notes?: NoteModel | null;
  pass?: boolean;
}

export interface ClaimRaceSummaryModel {
  locationId?: string | null;
  locationName?: string | null;
  /** @format date */
  raceDate?: string;
  races?: RaceModel | null;
  horsesClaimed?: HorseClaimedModel[] | null;
  isComplete?: boolean;
}

export interface ClaimedHorseModel {
  hisaHorseId?: string | null;
  name?: string | null;
  /** @format int32 */
  yearOfBirth?: number | null;
  damName?: string | null;
  ownerHisaId?: string | null;
  ownerName?: string | null;
  responsiblePersonHisaId?: string | null;
  responsiblePersonName?: string | null;
  attendingVet?: string[] | null;
  attendingVetName?: string[] | null;
  location?: HorseLocationModel[] | null;
  canRace?: boolean;
  canRaceReason?: string | null;
  canWork?: boolean;
  canWorkReason?: string | null;
  isOnVetsList?: boolean;
  /** @format int32 */
  daysRemainingOnVetsList?: number;
  /** @format date */
  lastStartDate?: string | null;
  /** @format date */
  lastWorkDate?: string | null;
  /** @format date */
  nextStartDate?: string | null;
  /** @format date */
  lastPostLayoffReportDate?: string | null;
  /** @format date */
  lastStartDateOverride?: string | null;
  /** @format date */
  postLayoffReportGracefulExpiration?: string | null;
  /** @format date */
  lastStartDateNotNull?: string;
  /** @format date */
  lastWorkDateNotNull?: string;
  /** @format date */
  nextStartDateNotNull?: string;
  /** @format date */
  dateOfDeath?: string | null;
  /** @format date */
  endOfCarierDay?: string | null;
  /** @format date */
  nextRaceEntryDate?: string | null;
  identification?: HorseIdentification | null;
  ownershipEntity?: string | null;
  status?: HorseStatus;
  isCoveredHorse?: boolean;
  barredFromRacing?: boolean;
  tjcId?: TjcTjcIdModel | null;
  tjcUpdateStatus?: TjcTjcUpdateStatus;
  ignoreForAutocomplete?: boolean;
  sireName?: string | null;
  color?: string | null;
  sex?: string | null;
  /** @format date */
  foaled?: string | null;
  raceAndReturn?: boolean;
  nominatedPersonIds?: string[] | null;
  nextRaceEntryLocation?: string | null;
  activity?: RecordActivity | null;
  uuid?: string | null;
  id?: string | null;
  isUnregisteredHorse?: boolean;
  isActive?: boolean;
  /** @format date */
  claimDate?: string;
  /** @format date-time */
  sortingDate?: string;
  claimHistoryId?: string | null;
  isCanCancel?: boolean;
}

export interface CompletedRaceModel {
  /** @minLength 1 */
  trackId: string;
  /**
   * @format date
   * @minLength 1
   */
  claimDate: string;
  /** @minItems 1 */
  raceNumbers: number[];
}

export interface CompletedRaceRequest {
  claimHistoryId?: string | null;
  /** @format date-time */
  createdDateTime?: string;
  /** @format date */
  claimDate?: string;
  race?: string | null;
  trackId?: string | null;
  notes?: string | null;
}

export interface ConstructorInfo {
  name?: string | null;
  declaringType?: Type | null;
  reflectedType?: Type | null;
  module?: Module | null;
  customAttributes?: CustomAttributeData[] | null;
  isCollectible?: boolean;
  /** @format int32 */
  metadataToken?: number;
  attributes?: MethodAttributes;
  methodImplementationFlags?: MethodImplAttributes;
  callingConvention?: CallingConventions;
  isAbstract?: boolean;
  isConstructor?: boolean;
  isFinal?: boolean;
  isHideBySig?: boolean;
  isSpecialName?: boolean;
  isStatic?: boolean;
  isVirtual?: boolean;
  isAssembly?: boolean;
  isFamily?: boolean;
  isFamilyAndAssembly?: boolean;
  isFamilyOrAssembly?: boolean;
  isPrivate?: boolean;
  isPublic?: boolean;
  isConstructedGenericMethod?: boolean;
  isGenericMethod?: boolean;
  isGenericMethodDefinition?: boolean;
  containsGenericParameters?: boolean;
  methodHandle?: RuntimeMethodHandle;
  isSecurityCritical?: boolean;
  isSecuritySafeCritical?: boolean;
  isSecurityTransparent?: boolean;
  memberType?: MemberTypes;
}

export interface CoveredHorseActivities {
  /** @format date */
  lastStartDate?: string | null;
  /** @format date */
  lastWorkDate?: string | null;
  /** @format date */
  nextStartDate?: string | null;
}

export interface CoveredHorseAndTjcResponse {
  tjcHorses?: HorseMatchResponse[] | null;
  dbHorses?: CoveredHorseResponse[] | null;
}

export interface CoveredHorseCreateRequest {
  hisaHorseId?: string | null;
  /** @minLength 1 */
  name: string;
  /** @format int32 */
  yearOfBirth?: number | null;
  damName?: string | null;
  /** @minLength 1 */
  ownerHisaId: string;
  /** @minLength 1 */
  responsiblePersonHisaId: string;
  attendingVet?: string[] | null;
  location: HorseLocationModel[];
  canRaceReason?: string | null;
  canWorkReason?: string | null;
  /** @format date */
  lastStartDate?: string | null;
  /** @format date */
  lastWorkDate?: string | null;
  /** @format date */
  nextStartDate?: string | null;
  /** @format date */
  dateOfDeath?: string | null;
  /** @format date */
  endOfCarierDay?: string | null;
  /** @format date */
  nextRaceEntryDate?: string | null;
  identification?: HorseIdentificationModel | null;
  ownershipEntity?: string | null;
  status?: HorseStatus;
  isCoveredHorse?: boolean;
  barredFromRacing?: boolean;
  tjcId?: TjcTjcIdModel | null;
  tjcUpdateStatus?: TjcTjcUpdateStatus;
  ignoreForAutocomplete?: boolean;
  sireName?: string | null;
  color?: string | null;
  sex?: string | null;
  /** @format date */
  foaled?: string | null;
  raceAndReturn?: boolean;
  nominatedPersonIds?: string[] | null;
  nextRaceEntryLocation?: string | null;
  activity?: RecordActivity | null;
  uuid?: string | null;
  isUnregisteredHorse?: boolean;
  isActive?: boolean;
  tjcUpdateDetails?: string | null;
  /** @format date */
  shockwaveScheduledDate?: string | null;
  /** @format date-time */
  lastTjcCheckDate?: string | null;
}

export interface CoveredHorseExtendedResponse {
  hisaHorseId?: string | null;
  horseReport?: HorseReportResponse | null;
  canRace?: CanRaceHorseResponse | null;
  /** @format date */
  lastRace?: string | null;
  /** @format int32 */
  daysSinceLastRace?: number | null;
  vetListInfo?: HorseVetListInfoResponse | null;
  /**
   * @deprecated
   * @format date
   */
  vetListEarliestOffDate?: string | null;
  /** @format int32 */
  unreadMessageCount?: number;
  clearanceInfo?: HorseVetClearanceInfoResponse | null;
  /** @format int32 */
  allMessageCount?: number;
  /** @format int32 */
  daysUtilEarliestOff?: number | null;
}

export interface CoveredHorseFindCreateRequest {
  hisaHorseId?: string | null;
  name?: string | null;
  /** @format int32 */
  yearOfBirth?: number | null;
  damName?: string | null;
  ownerHisaId?: string | null;
  /** @minLength 1 */
  responsiblePersonHisaId: string;
  attendingVet?: string[] | null;
  location?: HorseLocationModel[] | null;
  canRaceReason?: string | null;
  canWorkReason?: string | null;
  /** @format date */
  lastStartDate?: string | null;
  /** @format date */
  lastWorkDate?: string | null;
  /** @format date */
  nextStartDate?: string | null;
  /** @format date */
  dateOfDeath?: string | null;
  /** @format date */
  endOfCarierDay?: string | null;
  /** @format date */
  nextRaceEntryDate?: string | null;
  identification?: HorseIdentificationModel | null;
  ownershipEntity?: string | null;
  status?: HorseStatus;
  isCoveredHorse?: boolean;
  barredFromRacing?: boolean;
  tjcId?: TjcTjcIdModel | null;
  tjcUpdateStatus?: TjcTjcUpdateStatus;
  ignoreForAutocomplete?: boolean;
  sireName?: string | null;
  color?: string | null;
  sex?: string | null;
  /** @format date */
  foaled?: string | null;
  raceAndReturn?: boolean;
  nominatedPersonIds?: string[] | null;
  nextRaceEntryLocation?: string | null;
  activity?: RecordActivity | null;
  uuid?: string | null;
  isUnregisteredHorse?: boolean;
  isActive?: boolean;
  tjcUpdateDetails?: string | null;
  /** @format date */
  shockwaveScheduledDate?: string | null;
  /** @format date-time */
  lastTjcCheckDate?: string | null;
}

export interface CoveredHorsePatchRequest {
  hisaHorseId?: string | null;
  name?: string | null;
  /** @format int32 */
  yearOfBirth?: number | null;
  damName?: string | null;
  ownerHisaId?: string | null;
  responsiblePersonHisaId?: string | null;
  attendingVet?: string[] | null;
  location?: HorseLocationModel[] | null;
  /** @format date */
  lastStartDate?: string | null;
  /** @format date */
  lastWorkDate?: string | null;
  /** @format date */
  nextStartDate?: string | null;
  /** @format date */
  dateOfDeath?: string | null;
  /** @format date */
  endOfCarierDay?: string | null;
  /** @format date */
  nextRaceEntryDate?: string | null;
  identification?: HorseIdentificationModel | null;
  ownershipEntity?: string | null;
  status?: HorseStatus | null;
  isCoveredHorse?: boolean | null;
  barredFromRacing?: boolean | null;
  tjcId?: TjcTjcIdModel | null;
  tjcUpdateStatus?: TjcTjcUpdateStatus | null;
  ignoreForAutocomplete?: boolean | null;
  sireName?: string | null;
  color?: string | null;
  sex?: string | null;
  /** @format date */
  foaled?: string | null;
  raceAndReturn?: boolean | null;
  nominatedPersonIds?: string[] | null;
  nextRaceEntryLocation?: string | null;
  isUnregisteredHorse?: boolean | null;
  isActive?: boolean | null;
  tjcUpdateDetails?: string | null;
  /** @format date */
  shockwaveScheduledDate?: string | null;
  /** @format date-time */
  lastTjcCheckDate?: string | null;
}

export interface CoveredHorseRequest {
  hisaHorseId?: string | null;
  name?: string | null;
  /** @format int32 */
  yearOfBirth?: number | null;
  damName?: string | null;
  ownerHisaId?: string | null;
  /** @minLength 1 */
  responsiblePersonHisaId: string;
  attendingVet?: string[] | null;
  location?: HorseLocationModel[] | null;
  canRaceReason?: string | null;
  canWorkReason?: string | null;
  /** @format date */
  lastStartDate?: string | null;
  /** @format date */
  lastWorkDate?: string | null;
  /** @format date */
  nextStartDate?: string | null;
  /** @format date */
  dateOfDeath?: string | null;
  /** @format date */
  endOfCarierDay?: string | null;
  /** @format date */
  nextRaceEntryDate?: string | null;
  identification?: HorseIdentificationModel | null;
  ownershipEntity?: string | null;
  status?: HorseStatus;
  isCoveredHorse?: boolean;
  barredFromRacing?: boolean;
  tjcId?: TjcTjcIdModel | null;
  tjcUpdateStatus?: TjcTjcUpdateStatus;
  ignoreForAutocomplete?: boolean;
  sireName?: string | null;
  color?: string | null;
  sex?: string | null;
  /** @format date */
  foaled?: string | null;
  raceAndReturn?: boolean;
  nominatedPersonIds?: string[] | null;
  nextRaceEntryLocation?: string | null;
  activity?: RecordActivity | null;
  uuid?: string | null;
  isUnregisteredHorse?: boolean;
  isActive?: boolean;
  tjcUpdateDetails?: string | null;
  /** @format date */
  shockwaveScheduledDate?: string | null;
  /** @format date-time */
  lastTjcCheckDate?: string | null;
}

export interface CoveredHorseResponse {
  hisaHorseId?: string | null;
  name?: string | null;
  /** @format int32 */
  yearOfBirth?: number | null;
  damName?: string | null;
  ownerHisaId?: string | null;
  /** @minLength 1 */
  responsiblePersonHisaId: string;
  attendingVet?: string[] | null;
  location?: HorseLocationModel[] | null;
  canRaceReason?: string | null;
  canWorkReason?: string | null;
  /** @format date */
  lastStartDate?: string | null;
  /** @format date */
  lastWorkDate?: string | null;
  /** @format date */
  nextStartDate?: string | null;
  /** @format date */
  dateOfDeath?: string | null;
  /** @format date */
  endOfCarierDay?: string | null;
  /** @format date */
  nextRaceEntryDate?: string | null;
  identification?: HorseIdentificationModel | null;
  ownershipEntity?: string | null;
  status?: HorseStatus;
  isCoveredHorse?: boolean;
  barredFromRacing?: boolean;
  tjcId?: TjcTjcIdModel | null;
  tjcUpdateStatus?: TjcTjcUpdateStatus;
  ignoreForAutocomplete?: boolean;
  sireName?: string | null;
  color?: string | null;
  sex?: string | null;
  /** @format date */
  foaled?: string | null;
  raceAndReturn?: boolean;
  nominatedPersonIds?: string[] | null;
  nextRaceEntryLocation?: string | null;
  activity?: RecordActivity | null;
  uuid?: string | null;
  isUnregisteredHorse?: boolean;
  isActive?: boolean;
  tjcUpdateDetails?: string | null;
  /** @format date */
  shockwaveScheduledDate?: string | null;
  /** @format date-time */
  lastTjcCheckDate?: string | null;
  ownerName?: string | null;
  responsiblePersonName?: string | null;
  attendingVetName?: string[] | null;
  /** @format date */
  lastStartDateOverride?: string | null;
  /** @format date */
  postLayoffReportGracefulExpiration?: string | null;
  /** @format date */
  lastPostLayoffReportDate?: string | null;
}

export interface CoveredHorseSearchResponse {
  hisaHorseId?: string | null;
  name?: string | null;
  /** @format int32 */
  yearOfBirth?: number | null;
  damName?: string | null;
  ownerHisaId?: string | null;
  /** @minLength 1 */
  responsiblePersonHisaId: string;
  attendingVet?: string[] | null;
  location?: HorseLocationModel[] | null;
  canRaceReason?: string | null;
  canWorkReason?: string | null;
  /** @format date */
  lastStartDate?: string | null;
  /** @format date */
  lastWorkDate?: string | null;
  /** @format date */
  nextStartDate?: string | null;
  /** @format date */
  dateOfDeath?: string | null;
  /** @format date */
  endOfCarierDay?: string | null;
  /** @format date */
  nextRaceEntryDate?: string | null;
  identification?: HorseIdentificationModel | null;
  ownershipEntity?: string | null;
  status?: HorseStatus;
  isCoveredHorse?: boolean;
  barredFromRacing?: boolean;
  tjcId?: TjcTjcIdModel | null;
  tjcUpdateStatus?: TjcTjcUpdateStatus;
  ignoreForAutocomplete?: boolean;
  sireName?: string | null;
  color?: string | null;
  sex?: string | null;
  /** @format date */
  foaled?: string | null;
  raceAndReturn?: boolean;
  nominatedPersonIds?: string[] | null;
  nextRaceEntryLocation?: string | null;
  activity?: RecordActivity | null;
  uuid?: string | null;
  isUnregisteredHorse?: boolean;
  isActive?: boolean;
  tjcUpdateDetails?: string | null;
  /** @format date */
  shockwaveScheduledDate?: string | null;
  /** @format date-time */
  lastTjcCheckDate?: string | null;
  ownerName?: string | null;
  responsiblePersonName?: string | null;
  attendingVetName?: string[] | null;
  canRace?: boolean;
  canWork?: boolean;
  isOnVetsList?: boolean;
  /** @format int32 */
  daysRemainingOnVetsList?: number;
  /** @format date */
  lastStartDateNotNull?: string;
  /** @format date */
  lastWorkDateNotNull?: string;
  /** @format date */
  nextStartDateNotNull?: string;
  id?: string | null;
  /** @format date */
  lastPostLayoffReportDate?: string | null;
  /** @format date */
  lastStartDateOverride?: string | null;
}

export interface CoveredHorseUpdateRequest {
  /** @minLength 1 */
  hisaHorseId: string;
  name?: string | null;
  /** @format int32 */
  yearOfBirth?: number | null;
  damName?: string | null;
  /** @minLength 1 */
  ownerHisaId: string;
  /** @minLength 1 */
  responsiblePersonHisaId: string;
  attendingVet?: string[] | null;
  location?: HorseLocationModel[] | null;
  canRaceReason?: string | null;
  canWorkReason?: string | null;
  /** @format date */
  lastStartDate?: string | null;
  /** @format date */
  lastWorkDate?: string | null;
  /** @format date */
  nextStartDate?: string | null;
  /** @format date */
  dateOfDeath?: string | null;
  /** @format date */
  endOfCarierDay?: string | null;
  /** @format date */
  nextRaceEntryDate?: string | null;
  identification?: HorseIdentificationModel | null;
  ownershipEntity?: string | null;
  status?: HorseStatus;
  isCoveredHorse?: boolean;
  barredFromRacing?: boolean;
  tjcId?: TjcTjcIdModel | null;
  tjcUpdateStatus?: TjcTjcUpdateStatus;
  ignoreForAutocomplete?: boolean;
  sireName?: string | null;
  color?: string | null;
  sex?: string | null;
  /** @format date */
  foaled?: string | null;
  raceAndReturn?: boolean;
  nominatedPersonIds?: string[] | null;
  nextRaceEntryLocation?: string | null;
  activity?: RecordActivity | null;
  uuid?: string | null;
  isUnregisteredHorse?: boolean;
  isActive?: boolean;
  tjcUpdateDetails?: string | null;
  /** @format date */
  shockwaveScheduledDate?: string | null;
  /** @format date-time */
  lastTjcCheckDate?: string | null;
}

export interface CoveredPersonAddress {
  street?: string | null;
  city?: string | null;
  state?: string | null;
  zipPostalCode?: string | null;
  country?: string | null;
  unitAptBoxNumber?: string | null;
  locationId?: string | null;
  name?: string | null;
}

export interface CoveredPersonAutocompleteResponse {
  hisaPersonId?: string | null;
  name?: string | null;
  roles?: string[] | null;
}

export interface CreateQuestionnaireAnswerRequest {
  userName?: string | null;
  /** @minLength 1 */
  locationId: string;
  /** @minLength 1 */
  personId: string;
}

export interface CustomAttributeData {
  attributeType?: Type | null;
  constructor?: ConstructorInfo | null;
  constructorArguments?: CustomAttributeTypedArgument[] | null;
  namedArguments?: CustomAttributeNamedArgument[] | null;
}

export interface CustomAttributeNamedArgument {
  memberInfo?: MemberInfo | null;
  typedValue?: CustomAttributeTypedArgument;
  memberName?: string | null;
  isField?: boolean;
}

export interface CustomAttributeTypedArgument {
  argumentType?: Type | null;
  value?: any;
}

export interface DateRange {
  /** @format date */
  startDate?: string | null;
  /** @format date */
  endDate?: string | null;
}

export interface DayDetails {
  isActive?: boolean;
}

export interface DiscussionAttachment {
  attachmentId?: string | null;
  fileName?: string | null;
}

export interface DiscussionMessage {
  personId?: string | null;
  /** @format date-time */
  sentAt?: string;
  content?: string | null;
  attachments?: DiscussionAttachment[] | null;
}

export interface DocumentFileListResponse {
  id?: string | null;
  documentFiles?: DocumentFileResponse[] | null;
}

export interface DocumentFileResponse {
  documentId?: string | null;
  presignedURL?: string | null;
  /** @format date-time */
  uploadTimestamp?: string;
  filename?: string | null;
  documentType?: string | null;
  batchId?: string | null;
  tags?: string[] | null;
  isTransferable?: boolean | null;
  filePath?: string | null;
}

export interface DocumentLink {
  title?: string | null;
  url?: string | null;
}

export interface DynatraceSession {
  /** @format int32 */
  dynatraceSessionId?: number;
  /** @format int64 */
  startTime?: number;
  /** @format date-time */
  startTimeUtc?: string;
  /** @format int64 */
  endTime?: number;
  /** @format date-time */
  endTimeUtc?: string;
  browserFamily?: string | null;
  browserMajorVersion?: string | null;
  browserType?: string | null;
  city?: string | null;
  continent?: string | null;
  country?: string | null;
  displayResolution?: string | null;
  /** @format int64 */
  duration?: number;
  endReason?: string | null;
  hasCrash?: boolean;
  hasSessionReplay?: boolean;
  ip?: string | null;
  isp?: string | null;
  /** @format int64 */
  totalErrorCount?: number;
  /** @format int64 */
  totalLicenseCreditCount?: number;
  /** @format int32 */
  userActionCount?: number;
  userExperienceScore?: string | null;
  userId?: string | null;
  userSessionId?: string | null;
  replayLinkStatus?: LinkStatus;
  /** @format date-time */
  statusUpdateTime?: string;
  replayLink?: string | null;
  /** @format int32 */
  errorsCount?: number;
  errorText?: string | null;
  highPriority?: boolean;
}

export interface EnterRaceRequest {
  locationId?: string | null;
  /** @format date */
  date?: string | null;
}

export interface Entity {
  /** @format int32 */
  id?: number;
  /** @format int32 */
  beginOffset?: number;
  /** @format int32 */
  endOffset?: number;
  /** @format double */
  score?: number;
  text?: string | null;
  category?: string | null;
  type?: string | null;
  traits?: TraitModel[] | null;
  attributes?: AttributeModel[] | null;
}

export interface EnumResponse {
  enumName?: string | null;
  enumValues?: Record<string, string>;
}

export interface ErrorDetails {
  code?: string | null;
  message?: string | null;
  fileExists?: string[] | null;
}

export interface EventInfo {
  name?: string | null;
  declaringType?: Type | null;
  reflectedType?: Type | null;
  module?: Module | null;
  customAttributes?: CustomAttributeData[] | null;
  isCollectible?: boolean;
  /** @format int32 */
  metadataToken?: number;
  memberType?: MemberTypes;
  attributes?: EventAttributes;
  isSpecialName?: boolean;
  addMethod?: MethodInfo | null;
  removeMethod?: MethodInfo | null;
  raiseMethod?: MethodInfo | null;
  isMulticast?: boolean;
  eventHandlerType?: Type | null;
}

export interface Exception {
  targetSite?: MethodBase | null;
  message?: string | null;
  data?: Record<string, any>;
  innerException?: Exception | null;
  helpLink?: string | null;
  source?: string | null;
  /** @format int32 */
  hResult?: number;
  stackTrace?: string | null;
}

export interface FailedScratchInfo {
  scratchId?: string | null;
  /** @format int32 */
  status?: number;
  message?: string | null;
}

export interface FieldInfo {
  name?: string | null;
  declaringType?: Type | null;
  reflectedType?: Type | null;
  module?: Module | null;
  customAttributes?: CustomAttributeData[] | null;
  isCollectible?: boolean;
  /** @format int32 */
  metadataToken?: number;
  memberType?: MemberTypes;
  attributes?: FieldAttributes;
  fieldType?: Type | null;
  isInitOnly?: boolean;
  isLiteral?: boolean;
  /** @deprecated */
  isNotSerialized?: boolean;
  isPinvokeImpl?: boolean;
  isSpecialName?: boolean;
  isStatic?: boolean;
  isAssembly?: boolean;
  isFamily?: boolean;
  isFamilyAndAssembly?: boolean;
  isFamilyOrAssembly?: boolean;
  isPrivate?: boolean;
  isPublic?: boolean;
  isSecurityCritical?: boolean;
  isSecuritySafeCritical?: boolean;
  isSecurityTransparent?: boolean;
  fieldHandle?: RuntimeFieldHandle;
}

export interface FileAttachment {
  documentId?: string | null;
  filename?: string | null;
}

export interface FileDetails {
  name?: string | null;
  location?: string | null;
  isFile?: boolean;
  size?: string | null;
  /** @format date-time */
  created?: string;
  /** @format date-time */
  modified?: string;
  multipleFiles?: boolean;
  permission?: AccessPermission | null;
}

export interface FileManagerDirectoryContent {
  path?: string | null;
  action?: string | null;
  newName?: string | null;
  names?: string[] | null;
  name?: string | null;
  /** @format int64 */
  size?: number;
  previousName?: string | null;
  /** @format date-time */
  dateModified?: string;
  /** @format date-time */
  dateCreated?: string;
  hasChild?: boolean;
  isFile?: boolean;
  type?: string | null;
  id?: string | null;
  filterPath?: string | null;
  filterId?: string | null;
  parentId?: string | null;
  targetPath?: string | null;
  renameFiles?: string[] | null;
  uploadFiles?: File[] | null;
  caseSensitive?: boolean;
  searchString?: string | null;
  showHiddenItems?: boolean;
  showFileExtension?: boolean;
  data?: FileManagerDirectoryContent[] | null;
  targetData?: FileManagerDirectoryContent | null;
  permission?: AccessPermission | null;
}

export interface FileManagerResponse {
  cwd?: FileManagerDirectoryContent | null;
  files?: FileManagerDirectoryContent[] | null;
  error?: ErrorDetails | null;
  details?: FileDetails | null;
}

export interface FilterDefinition {
  field?: WorkQueueSortFields;
  comparison?: Comparison;
  value?: any;
}

export interface FrontEndNotificationFullResponse {
  frontEndNotificationId?: string | null;
  pageId?: string | null;
  messageTitle?: string | null;
  details?: string | null;
  isPopup?: boolean;
  /** @format date-time */
  activeFrom?: string;
  /** @format date-time */
  activeTo?: string;
  targets?: NotificationTarget[] | null;
  responseOptions?: string[] | null;
  /** @format int32 */
  impressionCount?: number;
  /**
   * @format time
   * @pattern ([0-9]{1-2}.)?([0-9]{2}):(?:[0-9]{2}):([0-9]{2})
   */
  impressionInterval?: string;
  attestationId?: string | null;
  detailsPlain?: string | null;
  isDeleted?: boolean;
  deleteReason?: string | null;
}

export interface FrontEndNotificationRequest {
  frontEndNotificationId?: string | null;
  /** @minLength 1 */
  pageId: string;
  /** @minLength 1 */
  messageTitle: string;
  details?: string | null;
  isPopup: boolean;
  /**
   * @format date-time
   * @minLength 1
   */
  activeFrom: string;
  /**
   * @format date-time
   * @minLength 1
   */
  activeTo: string;
  targets?: NotificationTarget[] | null;
  responseOptions?: string[] | null;
  /** @format int32 */
  impressionCount?: number;
  /**
   * @format time
   * @pattern ([0-9]{1-2}.)?([0-9]{2}):(?:[0-9]{2}):([0-9]{2})
   */
  impressionInterval?: string;
  attestationId?: string | null;
}

export interface FrontEndNotificationResponseModel {
  frontEndNotificationId?: string | null;
  pageId?: string | null;
  messageTitle?: string | null;
  details?: string | null;
  isPopup?: boolean;
  /** @format date-time */
  activeFrom?: string;
  /** @format date-time */
  activeTo?: string;
  targets?: NotificationTarget[] | null;
  responseOptions?: string[] | null;
  /** @format int32 */
  impressionCount?: number;
  /**
   * @format time
   * @pattern ([0-9]{1-2}.)?([0-9]{2}):(?:[0-9]{2}):([0-9]{2})
   */
  impressionInterval?: string;
  attestationId?: string | null;
  detailsPlain?: string | null;
}

export interface GeneralQuestionModel {
  /** @format int32 */
  questionNumber?: number;
  question?: string | null;
  answer?: string | null;
}

export interface GenerateUserNameRequest {
  /** @minLength 1 */
  firstName: string;
  /** @minLength 1 */
  lastName: string;
  email?: string | null;
  phone?: string | null;
}

export interface HelpDeskNotesRequest {
  /** @format date */
  date?: string;
  category?: string | null;
  relations?: string[] | null;
  notes?: NotesDescriptions[] | null;
  ansafonNumber?: string | null;
  relatedNotes?: string[] | null;
}

export interface HelpDeskNotesResponse {
  /** @format date */
  date?: string;
  category?: string | null;
  relations?: string[] | null;
  notes?: NotesDescriptions[] | null;
  ansafonNumber?: string | null;
  relatedNotes?: string[] | null;
  noteId?: string | null;
}

export interface HorseActivityRecord {
  /** @format int32 */
  count?: number;
  /** @format int32 */
  daysUntilFirstEvent?: number | null;
}

export interface HorseAddAttendingVetRequest {
  /** @minLength 1 */
  hisaHorseId: string;
  /** @minLength 1 */
  initiatingPersonId: string;
  /** @format uuid */
  sourceCommandId?: string;
  /** @minLength 1 */
  newVetId: string;
}

export interface HorseAppointmentCreateRequest {
  /** @format int32 */
  personScheduleId?: number;
  /** @format date-time */
  startDateTime?: string;
  /** @format date-time */
  endDateTime?: string;
  horseId?: string | null;
  /** @format int32 */
  rtrReportId?: number | null;
}

export interface HorseAppointmentResponse {
  /** @format int32 */
  horseAppointmentId?: number;
  /** @format int32 */
  personScheduleId?: number;
  /** @format date-time */
  startDateTime?: string;
  /** @format date-time */
  endDateTime?: string;
  horseId?: string | null;
  /** @format int32 */
  rtrReportId?: number | null;
}

export interface HorseAutocomplete {
  hisaHorseId?: string | null;
  name?: string | null;
  /** @format int32 */
  yearOfBirth?: number | null;
  damName?: string | null;
  ownerHisaId?: string | null;
  ownerName?: string | null;
  responsiblePersonHisaId?: string | null;
  responsiblePersonName?: string | null;
  locationId?: string | null;
  locationName?: string | null;
}

export interface HorseBatchRetireRequest {
  /** @minItems 1 */
  hisaHorseIds: string[];
  isNotificationNeeded?: boolean;
  location?: HorseLocationModel | null;
  designatedOwnerId?: string | null;
  responsiblePersonId?: string | null;
  /**
   * @format date
   * @minLength 1
   */
  date: string;
  reason?: HorseRetireReason;
  notes?: string | null;
  suggestedCare?: string | null;
}

export interface HorseCanRaceByArrayRequest {
  /** @minItems 1 */
  aryHorseIds: string[];
  /** @format date */
  date?: string | null;
}

export interface HorseCanRaceOverrideRequest {
  /** @format date */
  lastStartDateOverride?: string | null;
}

export interface HorseChangeOwnerRequest {
  /** @minLength 1 */
  hisaHorseId: string;
  /** @minLength 1 */
  fromHisaPersonId: string;
  /** @minLength 1 */
  toHisaPersonId: string;
  toLocationOwnershipId?: string | null;
}

export interface HorseClaimBatchRequest {
  /** @minLength 1 */
  hisaHorseId: string;
  /** @minLength 1 */
  locationId: string;
  /** @minLength 1 */
  initiatingPersonId: string;
  /** @minLength 1 */
  newOwnerPersonId: string;
  /** @format date */
  claimDate?: string | null;
  /** @minLength 1 */
  newResponsiblePersonId: string;
  /** @minLength 1 */
  raceNumber: string;
  note?: string | null;
  ownershipEntity?: string | null;
  claimHistoryId?: string | null;
}

export interface HorseClaimCanMedicalRequest {
  /** @minLength 1 */
  hisaHorseId: string;
  /** @minLength 1 */
  initiatingPersonId: string;
}

export interface HorseClaimCancelRequest {
  /** @minLength 1 */
  claimHistoryId: string;
  /** @format date */
  claimCancelDate?: string | null;
  /** @minLength 1 */
  initiatingPersonId: string;
  /** @minLength 1 */
  reason: string;
  note?: string | null;
}

export interface HorseClaimReceiptRequest {
  /** @format uuid */
  sourceCommandId?: string;
}

export interface HorseClaimRequest {
  /** @minLength 1 */
  hisaHorseId: string;
  /** @minLength 1 */
  locationId: string;
  /** @minLength 1 */
  initiatingPersonId: string;
  /** @minLength 1 */
  newOwnerPersonId: string;
  /** @format date */
  claimDate?: string | null;
  /** @minLength 1 */
  newResponsiblePersonId: string;
  /** @minLength 1 */
  raceNumber: string;
  note?: string | null;
  ownershipEntity?: string | null;
}

export interface HorseClaimedModel {
  hisaHorseId?: string | null;
  /** @format int32 */
  raceNumber?: number | null;
  isVoided?: boolean;
}

export interface HorseDeathRequest {
  /** @minLength 1 */
  hisaHorseId: string;
  injuryHorseMedicalId?: string | null;
  notes?: string | null;
  /** @format date */
  dateOfDeath?: string | null;
  reason?: HorseDeathReason;
  locationId?: string | null;
  category?: string | null;
}

export interface HorseExtendStayRequest {
  vetsListId?: string | null;
  /** @format date */
  date?: string | null;
}

export interface HorseGetOffVetsListDoNotReqRegulatoryVetCommand {
  /** @format uuid */
  sourceCommandId: string;
  /** @minLength 1 */
  hisaHorseId: string;
  /** @minLength 1 */
  initiatingPersonId: string;
  vetsListId?: string | null;
}

export interface HorseGetOffVetsListFailedJogCommand {
  /** @format uuid */
  sourceCommandId: string;
  /** @minLength 1 */
  hisaHorseId: string;
  /** @minLength 1 */
  initiatingPersonId: string;
  vetsListId?: string | null;
}

export interface HorseGetOffVetsListPassedJogCommand {
  /** @format uuid */
  sourceCommandId: string;
  /** @minLength 1 */
  hisaHorseId: string;
  /** @minLength 1 */
  initiatingPersonId: string;
  vetsListId?: string | null;
}

export interface HorseGetOffVetsListReqRegulatoryVetCommand {
  /** @format uuid */
  sourceCommandId: string;
  /** @minLength 1 */
  hisaHorseId: string;
  /** @minLength 1 */
  initiatingPersonId: string;
  vetsListId?: string | null;
}

export interface HorseGetOffVetsListRequest {
  /** @minLength 1 */
  hisaHorseId: string;
  /** @minLength 1 */
  initiatingPersonId: string;
  vetsListId?: string | null;
  /** @format date */
  dateToComeOffList: string;
  regulatoryVetId?: string | null;
}

export interface HorseIdentification {
  trpbVerified?: boolean;
  /** @uniqueItems true */
  microChip?: number[] | null;
  lipTattoo?: string | null;
}

export interface HorseIdentificationModel {
  trpbVerified?: boolean;
  microChip?: number[] | null;
  lipTattoo?: string | null;
}

export interface HorseLocationModel {
  locationId?: string | null;
  horseLocationName?: string | null;
  address?: Address | null;
  current?: boolean;
  notes?: string | null;
  name?: string | null;
  phone?: string | null;
}

export interface HorseMatchRequest {
  horseName?: string | null;
  horseHisaId?: string | null;
  horseTattoo?: string | null;
  horseMicrochipNumber?: string | null;
  /** @format int32 */
  horseYearOfBirth?: number | null;
  horseDamName?: string | null;
  horseDamHisaId?: string | null;
  ownerHisaId?: string | null;
}

export interface HorseMatchResponse {
  hisaId?: string | null;
  name?: string | null;
  registry?: string | null;
  microchipNumber?: string | null;
  tattoo?: string | null;
  sireName?: string | null;
  damName?: string | null;
  sex?: string | null;
  color?: string | null;
  /** @format date */
  foaled?: string | null;
  /** @format int32 */
  tjcReferenceNumber?: number;
}

export interface HorseMedicalBatchUpdateRequest {
  locationId?: string | null;
  horseLocationId?: string | null;
  hisaHorseId?: string | null;
  designatedOwner?: string | null;
  responsibleHisaPersonId?: string | null;
  treatingHisaPersonId?: string | null;
  attendingVet?: string | null;
  /** @format date */
  date?: string;
  /**
   * @format time
   * @pattern ([0-9]{2}):(?:[0-9]{2}):([0-9]{2})
   */
  time?: string | null;
  clearedToWork?: boolean;
  clearedToRace?: boolean;
  recType: HorseMedicalRecType;
  vaccine?: string | null;
  drugName?: string | null;
  drugRoute?: HorseMedicalRouteAdmin;
  drugDosage?: string | null;
  procedure?: string | null;
  surgery?: string | null;
  dental?: string | null;
  physiotherapy?: string | null;
  chiropractic?: string | null;
  conditionTreated?: string | null;
  modality?: string | null;
  testName?: string | null;
  necropsyCategory?: string | null;
  testResults?: string | null;
  limbTreated?: string | null;
  notes?: string | null;
  associatedDocumentUrls?: string[] | null;
  preRace?: HorseMedicalPreRaceModel | null;
  structure?: string | null;
  description?: string | null;
  relatedVetsListId?: string | null;
  classifiedAs?: string | null;
  deleteReason?: string | null;
  retireReason?: HorseRetireReason | null;
  /** @format date */
  dateOfDeath?: string | null;
  deathReason?: HorseDeathReason | null;
  latLng?: string | null;
  drugPerscribingVetHisaId?: string | null;
  treatingPersonRole?: string | null;
  inspection?: InspectionModel | null;
  category?: string | null;
  internalNotes?: string | null;
  includeInStatus?: boolean | null;
  qcStatus?: QCStatus | null;
  hisaHorseMedicalId?: string | null;
}

export interface HorseMedicalHisaEntityModel {
  hisaId?: string | null;
  name?: string | null;
  displayName?: string | null;
}

export interface HorseMedicalItemPrivileges {
  update?: boolean;
}

export interface HorseMedicalPatchRequest {
  locationId?: string | null;
  horseLocationId?: string | null;
  hisaHorseId?: string | null;
  designatedOwner?: string | null;
  responsibleHisaPersonId?: string | null;
  treatingHisaPersonId?: string | null;
  attendingVet?: string | null;
  /** @format date */
  date?: string | null;
  /**
   * @format time
   * @pattern ([0-9]{2}):(?:[0-9]{2}):([0-9]{2})
   */
  time?: string | null;
  clearedToWork?: boolean | null;
  clearedToRace?: boolean | null;
  recType?: HorseMedicalRecType | null;
  vaccine?: string | null;
  drugName?: string | null;
  drugRoute?: HorseMedicalRouteAdmin | null;
  drugDosage?: string | null;
  procedure?: string | null;
  surgery?: string | null;
  dental?: string | null;
  physiotherapy?: string | null;
  chiropractic?: string | null;
  conditionTreated?: string | null;
  modality?: string | null;
  testName?: string | null;
  necropsyCategory?: string | null;
  testResults?: string | null;
  limbTreated?: string | null;
  notes?: string | null;
  associatedDocumentUrls?: string[] | null;
  preRace?: HorseMedicalPreRaceModel | null;
  structure?: string | null;
  description?: string | null;
  relatedVetsListId?: string | null;
  classifiedAs?: string | null;
  deleteReason?: string | null;
  retireReason?: HorseRetireReason | null;
  /** @format date */
  dateOfDeath?: string | null;
  deathReason?: HorseDeathReason | null;
  latLng?: string | null;
  drugPerscribingVetHisaId?: string | null;
  treatingPersonRole?: string | null;
  inspection?: InspectionModel | null;
  category?: string | null;
  internalNotes?: string | null;
  includeInStatus?: boolean | null;
  qcStatus?: QCStatus | null;
}

export interface HorseMedicalPreRaceModel {
  sexVerified?: boolean;
  horseIdentified?: boolean;
  joggObserved?: boolean;
  palpationPerformed?: boolean;
  postParade?: boolean;
  paddock?: boolean;
  startingGate?: boolean;
  weltsObserved?: boolean;
  /** @format int32 */
  overAllRating?: number | null;
  postRaceObservation?: HorseMedicalPostRaceObservation;
}

export interface HorseMedicalPrivilagesRequest {
  horseMedicalIds?: string[] | null;
}

export interface HorseMedicalPrivilegesResponse {
  privileges?: Record<string, HorseMedicalItemPrivileges>;
}

export interface HorseMedicalQcResponse {
  groupId?: string | null;
  records?: HorseMedicalResponse[] | null;
}

export interface HorseMedicalRecognizedName {
  name?: string | null;
  /** @format date */
  expiry?: string;
  /** @format date */
  administeredDate?: string;
}

export interface HorseMedicalRequest {
  locationId?: string | null;
  horseLocationId?: string | null;
  /** @minLength 1 */
  hisaHorseId: string;
  designatedOwner?: string | null;
  responsibleHisaPersonId?: string | null;
  treatingHisaPersonId?: string | null;
  attendingVet?: string | null;
  /** @format date */
  date?: string;
  /**
   * @format time
   * @pattern ([0-9]{2}):(?:[0-9]{2}):([0-9]{2})
   */
  time?: string | null;
  clearedToWork?: boolean;
  clearedToRace?: boolean;
  recType: HorseMedicalRecType;
  vaccine?: string | null;
  drugName?: string | null;
  drugRoute?: HorseMedicalRouteAdmin;
  drugDosage?: string | null;
  procedure?: string | null;
  surgery?: string | null;
  dental?: string | null;
  physiotherapy?: string | null;
  chiropractic?: string | null;
  conditionTreated?: string | null;
  modality?: string | null;
  testName?: string | null;
  necropsyCategory?: string | null;
  testResults?: string | null;
  limbTreated?: string | null;
  notes?: string | null;
  associatedDocumentUrls?: string[] | null;
  preRace?: HorseMedicalPreRaceModel | null;
  structure?: string | null;
  description?: string | null;
  relatedVetsListId?: string | null;
  classifiedAs?: string | null;
  deleteReason?: string | null;
  retireReason?: HorseRetireReason | null;
  /** @format date */
  dateOfDeath?: string | null;
  deathReason?: HorseDeathReason | null;
  latLng?: string | null;
  drugPerscribingVetHisaId?: string | null;
  treatingPersonRole?: string | null;
  inspection?: InspectionModel | null;
  category?: string | null;
  internalNotes?: string | null;
  includeInStatus?: boolean | null;
  qcStatus?: QCStatus | null;
}

export interface HorseMedicalResponse {
  hisaHorseMedicalId?: string | null;
  displayName?: string | null;
  locationRecord?: HorseMedicalHisaEntityModel | null;
  horseLocationRecord?: HorseMedicalHisaEntityModel | null;
  horseRecord?: HorseMedicalHisaEntityModel | null;
  designatedOwnerRecord?: HorseMedicalHisaEntityModel | null;
  responsibleHisaRecord?: HorseMedicalHisaEntityModel | null;
  treatingHisaPersonRecord?: HorseMedicalHisaEntityModel | null;
  attendingVetRecord?: HorseMedicalHisaEntityModel | null;
  /** @deprecated */
  locationId?: string | null;
  /** @deprecated */
  locationName?: string | null;
  /** @deprecated */
  horseLocationId?: string | null;
  /** @deprecated */
  horseLocationName?: string | null;
  /** @deprecated */
  hisaHorseId?: string | null;
  /** @deprecated */
  hisaHorseName?: string | null;
  /** @deprecated */
  designatedOwner?: string | null;
  /** @deprecated */
  designatedOwnerName?: string | null;
  /** @deprecated */
  responsibleHisaPersonId?: string | null;
  /** @deprecated */
  responsibleHisaPersonName?: string | null;
  /** @deprecated */
  treatingHisaPersonId?: string | null;
  /** @deprecated */
  treatingHisaPersonName?: string | null;
  /** @deprecated */
  attendingVet?: string | null;
  /** @deprecated */
  attendingVetName?: string | null;
  activity?: RecordActivity | null;
  /** @format date */
  date?: string;
  /**
   * @format time
   * @pattern ([0-9]{2}):(?:[0-9]{2}):([0-9]{2})
   */
  time?: string | null;
  clearedToWork?: boolean;
  clearedToRace?: boolean;
  recType?: HorseMedicalRecType;
  vaccine?: string | null;
  drugName?: string | null;
  drugRoute?: HorseMedicalRouteAdmin;
  drugDosage?: string | null;
  procedure?: string | null;
  surgery?: string | null;
  dental?: string | null;
  physiotherapy?: string | null;
  chiropractic?: string | null;
  conditionTreated?: string | null;
  modality?: string | null;
  testName?: string | null;
  necropsyCategory?: string | null;
  testResults?: string | null;
  limbTreated?: string | null;
  notes?: string | null;
  associatedDocumentUrls?: string[] | null;
  preRace?: HorseMedicalPreRaceModel | null;
  structure?: string | null;
  description?: string | null;
  relatedVetsListId?: string | null;
  classifiedAs?: string | null;
  deleteReason?: string | null;
  retireReason?: HorseRetireReason | null;
  /** @format date */
  dateOfDeath?: string | null;
  deathReason?: HorseDeathReason | null;
  latLng?: string | null;
  drugPerscribingVetHisaId?: string | null;
  treatingPersonRole?: string | null;
  inspection?: InspectionModel | null;
  category?: string | null;
  internalNotes?: string | null;
  includeInStatus?: boolean | null;
  qcStatus?: QCStatus | null;
  uuid?: string | null;
  isDeleted?: boolean;
  otherFields?: OtherFields[] | null;
  recognizedVaccines?: HorseMedicalRecognizedName[] | null;
  recognizedTests?: HorseMedicalRecognizedName[] | null;
}

export interface HorseMedicalSearchAllQuery {
  /** @format int32 */
  page?: number;
  /** @format int32 */
  pageSize?: number;
  sortBy?: string | null;
  /** @format int32 */
  sortDirection?: number;
  isAscSort?: boolean;
  /** @format date-time */
  startDate?: string | null;
  /** @format date-time */
  endDate?: string | null;
  /** @maxLength 100 */
  text?: string | null;
  horseIds?: string[] | null;
  showDeleted?: boolean;
  recTypes?: HorseMedicalRecType[] | null;
  excludeRecTypes?: HorseMedicalRecType[] | null;
}

export interface HorseMedicalSearchDuplicatesRequest {
  /** @format date */
  date?: string;
  locationId?: string | null;
  treatingHisaPersonId?: string | null;
  hisaHorseId?: string | null;
}

export interface HorseMedicalUpdateRequest {
  locationId?: string | null;
  horseLocationId?: string | null;
  /** @minLength 1 */
  hisaHorseId: string;
  designatedOwner?: string | null;
  responsibleHisaPersonId?: string | null;
  treatingHisaPersonId?: string | null;
  attendingVet?: string | null;
  /** @format date */
  date?: string;
  /**
   * @format time
   * @pattern ([0-9]{2}):(?:[0-9]{2}):([0-9]{2})
   */
  time?: string | null;
  clearedToWork?: boolean;
  clearedToRace?: boolean;
  recType: HorseMedicalRecType;
  vaccine?: string | null;
  drugName?: string | null;
  drugRoute?: HorseMedicalRouteAdmin;
  drugDosage?: string | null;
  procedure?: string | null;
  surgery?: string | null;
  dental?: string | null;
  physiotherapy?: string | null;
  chiropractic?: string | null;
  conditionTreated?: string | null;
  modality?: string | null;
  testName?: string | null;
  necropsyCategory?: string | null;
  testResults?: string | null;
  limbTreated?: string | null;
  notes?: string | null;
  associatedDocumentUrls?: string[] | null;
  preRace?: HorseMedicalPreRaceModel | null;
  structure?: string | null;
  description?: string | null;
  relatedVetsListId?: string | null;
  classifiedAs?: string | null;
  deleteReason?: string | null;
  retireReason?: HorseRetireReason | null;
  /** @format date */
  dateOfDeath?: string | null;
  deathReason?: HorseDeathReason | null;
  latLng?: string | null;
  drugPerscribingVetHisaId?: string | null;
  treatingPersonRole?: string | null;
  inspection?: InspectionModel | null;
  category?: string | null;
  internalNotes?: string | null;
  includeInStatus?: boolean | null;
  qcStatus?: QCStatus | null;
}

export interface HorseMicrochipsQuery {
  horseId?: string | null;
  damName?: string | null;
  /** @format int32 */
  birthYear?: number | null;
}

export interface HorseNameResponse {
  hisaHorseId?: string | null;
  name?: string | null;
}

export interface HorseRemoveAttendingVetRequest {
  /** @minLength 1 */
  hisaHorseId: string;
  /** @minLength 1 */
  initiatingPersonId: string;
  /** @format uuid */
  sourceCommandId?: string;
  /** @minLength 1 */
  vetId: string;
}

export interface HorseReportResponse {
  reportStatus?: ReportStatus;
  horsePlrReport?: PostLayoffInfo | null;
}

export interface HorseRetireDocumentUploadRequest {
  /** @minItems 1 */
  horseIds: string[];
  /** @minLength 1 */
  fileName: string;
  /** @minLength 1 */
  locationId: string;
}

export interface HorseShareAcceptRequest {
  /** @minLength 1 */
  hisaHorseId: string;
  /**
   * @format uuid
   * @minLength 1
   */
  sourceCommandId: string;
  /** @minLength 1 */
  fromHisaPersonId: string;
  /** @minLength 1 */
  toHisaPersonId: string;
}

export interface HorseShareRejectRequest {
  /** @minLength 1 */
  hisaHorseId: string;
  /**
   * @format uuid
   * @minLength 1
   */
  sourceCommandId: string;
  /** @minLength 1 */
  fromHisaPersonId: string;
  /** @minLength 1 */
  toHisaPersonId: string;
}

export interface HorseShareRequst {
  /** @minLength 1 */
  hisaHorseId: string;
  /** @minLength 1 */
  fromHisaPersonId: string;
  /** @minLength 1 */
  toHisaPersonId: string;
}

export interface HorseShockwaveAcceptRejectRequest {
  /** @minLength 1 */
  hisaHorseId: string;
  /** @minLength 1 */
  initiatingPersonId: string;
  /** @format date */
  appointmentDate: string;
  /** @minLength 1 */
  regulatoryVetId: string;
}

export interface HorseShockwaveBaseRequest {
  /** @minLength 1 */
  hisaHorseId: string;
  /** @minLength 1 */
  initiatingPersonId: string;
}

export interface HorseShockwaveRequest {
  /** @minLength 1 */
  hisaHorseId: string;
  /** @minLength 1 */
  initiatingPersonId: string;
  /** @format date */
  appointmentDate: string;
}

export interface HorseTakebackCommand {
  /** @minLength 1 */
  hisaHorseId: string;
  /** @minLength 1 */
  fromHisaPersonId: string;
}

export interface HorseTransferAcceptCommand {
  /** @minLength 1 */
  hisaHorseId: string;
  /** @format uuid */
  sourceCommandId: string;
  /** @minLength 1 */
  fromHisaPersonId: string;
  /** @minLength 1 */
  toHisaPersonId: string;
  toLocationOwnershipId?: string | null;
}

export interface HorseTransferAssignOwnerTrainerRequest {
  /** @minLength 1 */
  hisaHorseId: string;
  /** @minLength 1 */
  newOwnerId: string;
  /** @minLength 1 */
  newRespPersonId: string;
  /** @minLength 1 */
  notes: string;
  /** @minLength 1 */
  toLocationOwnershipId: string;
}

export interface HorseTransferBackToOwnerCommand {
  /** @minLength 1 */
  hisaHorseId: string;
  /** @minLength 1 */
  newRespPersonId: string;
  /** @minLength 1 */
  reason: string;
  notes?: string | null;
}

export interface HorseTransferRejectCommand {
  /** @minLength 1 */
  hisaHorseId: string;
  /** @format uuid */
  sourceCommandId: string;
  /** @minLength 1 */
  fromHisaPersonId: string;
  /** @minLength 1 */
  toHisaPersonId: string;
  toLocationOwnershipId?: string | null;
}

export interface HorseTransferRequest {
  /** @minLength 1 */
  hisaHorseId: string;
  /** @minLength 1 */
  fromHisaPersonId: string;
  /** @minLength 1 */
  toHisaPersonId: string;
}

export interface HorseUnshareRequest {
  /** @minLength 1 */
  hisaHorseId: string;
  /** @minLength 1 */
  fromHisaPersonId: string;
}

export interface HorseVetClearanceInfoResponse {
  /** @format date */
  clearedOn?: string;
  /** @format date */
  clearedUntil?: string;
  type?: HorseVetClearanceType;
}

export interface HorseVetListInfoResponse {
  /** @format date */
  datePlaceOnList?: string;
  /** @format date */
  releaseDate?: string | null;
  /** @format date */
  eligibleToWork?: string | null;
  /** @format date */
  dateToComeOff?: string | null;
  reason?: VetsListReason | null;
  isRegVetClearRequired?: boolean;
  restrictWorks?: boolean;
}

export interface HorsesToClaimRequest {
  trackId?: string | null;
  /** @format date */
  claimDate?: string;
  raceNumber?: string | null;
  horseIds?: string[] | null;
}

export type IActionResult = object;

export type ICustomAttributeProvider = object;

export interface InjuryBatchRequest {
  type?: InjuryType;
  locationId?: string | null;
  locationName?: string | null;
  circumstance?: InjuryCircumstance;
  where?: string | null;
  weather?: string | null;
  witnessStatments?: InjuryWitnessStatment[] | null;
  people?: InjuryPersonModel[] | null;
  /** @format date */
  dateOfInjury?: string;
  raceNumber?: string | null;
  relatedVetsListId?: string | null;
  notes?: string | null;
  horses?: InjuryHorseRequest[] | null;
  hisaInjuryId?: string | null;
}

export interface InjuryDuplicateModel {
  isFullMatch?: boolean;
  /** @format date */
  date?: string | null;
  locationId?: string | null;
  raceNumber?: string | null;
  circumstance?: InjuryCircumstance | null;
}

export interface InjuryHorseRequest {
  hisaHorseId?: string | null;
  horseLocationId?: string | null;
  responsiblePersonHisaId?: string | null;
  ownerHisaId?: string | null;
  jockeyHisaId?: string | null;
  attendingVetHisaId?: string[] | null;
  regulatoryVetId?: string | null;
  vannedOff?: boolean;
  outcome?: InjuryHorseOutcome;
  triageScore?: InjuryHorseTriageScore;
  /** @format date */
  dateEuthanized?: string | null;
  /** @format date */
  dateDied?: string | null;
  /** @format date */
  dateOfNecropsy?: string | null;
  notes?: string | null;
}

export interface InjuryHorseResponse {
  hisaHorseId?: string | null;
  horseLocationId?: string | null;
  responsiblePersonHisaId?: string | null;
  ownerHisaId?: string | null;
  jockeyHisaId?: string | null;
  attendingVetHisaId?: string[] | null;
  regulatoryVetId?: string | null;
  vannedOff?: boolean;
  outcome?: InjuryHorseOutcome;
  triageScore?: InjuryHorseTriageScore;
  /** @format date */
  dateEuthanized?: string | null;
  /** @format date */
  dateDied?: string | null;
  /** @format date */
  dateOfNecropsy?: string | null;
  notes?: string | null;
  horseName?: string | null;
  horseLocationName?: string | null;
  /** @format date-time */
  lastCommunicationTimestmap?: string | null;
  horseActivity?: ActivityInfo | null;
}

export interface InjuryHorseSearchResponse {
  hisaHorseId?: string | null;
  horseLocationId?: string | null;
  responsiblePersonHisaId?: string | null;
  ownerHisaId?: string | null;
  jockeyHisaId?: string | null;
  attendingVetHisaId?: string[] | null;
  regulatoryVetId?: string | null;
  vannedOff?: boolean;
  outcome?: InjuryHorseOutcome;
  triageScore?: InjuryHorseTriageScore;
  /** @format date */
  dateEuthanized?: string | null;
  /** @format date */
  dateDied?: string | null;
  /** @format date */
  dateOfNecropsy?: string | null;
  notes?: string | null;
  hisaInjuryId?: string | null;
  /** @format date */
  dateOfInjury?: string;
  /** @format int32 */
  daysSinceInjury?: number;
  horseName?: string | null;
  horseNameId?: string | null;
  status?: HorseStatus;
  locationId?: string | null;
  locationName?: string | null;
  locationNameId?: string | null;
  horseLocationName?: string | null;
  horseLocationNameId?: string | null;
  circumstance?: InjuryCircumstance;
  /** @format date-time */
  lastCommunicationTimestmap?: string | null;
  horseActivity?: ActivityInfo | null;
}

export interface InjuryPersonModel {
  hisaPersonId?: string | null;
  clearedToReturn?: boolean;
  role?: InjuryPersonRole;
  outcome?: InjuryPersonOutcome;
  cause?: InjuryPersonCause;
  /** @format date */
  dateOfAutopsy?: string | null;
  /** @format date */
  dateDied?: string | null;
}

export interface InjuryRequest {
  type?: InjuryType;
  locationId?: string | null;
  locationName?: string | null;
  circumstance?: InjuryCircumstance;
  where?: string | null;
  weather?: string | null;
  witnessStatments?: InjuryWitnessStatment[] | null;
  people?: InjuryPersonModel[] | null;
  /** @format date */
  dateOfInjury?: string;
  raceNumber?: string | null;
  relatedVetsListId?: string | null;
  notes?: string | null;
  horses?: InjuryHorseRequest[] | null;
}

export interface InjuryResponse {
  type?: InjuryType;
  locationId?: string | null;
  locationName?: string | null;
  circumstance?: InjuryCircumstance;
  where?: string | null;
  weather?: string | null;
  witnessStatments?: InjuryWitnessStatment[] | null;
  people?: InjuryPersonModel[] | null;
  /** @format date */
  dateOfInjury?: string;
  raceNumber?: string | null;
  relatedVetsListId?: string | null;
  notes?: string | null;
  hisaInjuryId?: string | null;
  horses?: InjuryHorseResponse[] | null;
  activity?: RecordActivity | null;
  uuid?: string | null;
}

export interface InjuryWitnessStatment {
  hisaPersonId?: string | null;
  name?: string | null;
  details?: string | null;
}

export interface InspectionModel {
  /** @minLength 1 */
  race: string;
  recScratched?: boolean;
  flagged?: boolean;
  cleared?: boolean;
  preRace?: PreRaceModel | null;
  paddock?: InspectionStageModel | null;
  postParade?: InspectionStageModel | null;
  startingGate?: InspectionStageModel | null;
  afterRace?: InspectionStageModel | null;
  afterRaceObservation?: string | null;
  claimInspection?: ClaimInspectionModel | null;
}

export interface InspectionStageModel {
  createdHisaPersonId?: string | null;
  /** @format date-time */
  createdDate?: string;
  latLng?: string | null;
  recScratch?: boolean;
  reason?: string | null;
  flagged?: boolean;
  cleared?: boolean;
  notes?: NoteModel | null;
}

export type IntPtr = object;

export interface IsAllowedToComeOffResult {
  vetsListId?: string | null;
  isAllowedToComeOff?: boolean;
  reasons?: string[] | null;
}

export interface JockeyAgentInviteJockeyAcceptCommand {
  /** @minLength 1 */
  jokeyAgentId: string;
  /** @minLength 1 */
  jockeyId: string;
  /** @format uuid */
  sourceCommandId: string;
}

export interface JockeyAgentInviteJockeyCommand {
  /** @minLength 1 */
  jokeyAgentId: string;
  /** @minLength 1 */
  jockeyId: string;
}

export interface JockeyAgentInviteJockeyRejectCommand {
  /** @minLength 1 */
  jokeyAgentId: string;
  /** @minLength 1 */
  jockeyId: string;
  /** @format uuid */
  sourceCommandId: string;
}

export interface LicenseJobItem {
  token?: string | null;
  status?: string | null;
  /** @format date-time */
  submitionDate?: string;
  result?: LicenseJobResult | null;
  errorDetail?: string | null;
}

export interface LicenseJobResult {
  firstName?: string | null;
  middleName?: string | null;
  lastName?: string | null;
  state?: string | null;
  licenseNumber?: string | null;
}

export interface LipchipArrivalRequest {
  moveId?: string | null;
  licensePlate?: string | null;
  driverName?: string | null;
  licPicId?: string | null;
  hisaHorseId?: string | null;
  locationId?: string | null;
  notes?: string | null;
  geoLocation?: string | null;
  /** @format date-time */
  timestamp?: string | null;
  attachments?: LipchipAttachmentModel[] | null;
}

export interface LipchipArrivalResponse {
  moveId?: string | null;
  licensePlate?: string | null;
  driverName?: string | null;
  licPicId?: string | null;
  hisaHorseId?: string | null;
  locationId?: string | null;
  notes?: string | null;
  geoLocation?: string | null;
  /** @format date-time */
  timestamp?: string | null;
  attachments?: LipchipAttachmentModel[] | null;
}

export interface LipchipAttachmentModel {
  /** @format uuid */
  attachmentId?: string;
  type?: string | null;
}

export interface LipchipDriveUpdateRequest {
  moveId?: string | null;
  hisaHorseId?: string | null;
  locationId?: string | null;
  geoLocation?: string | null;
  /** @format date-time */
  timestamp?: string;
}

export interface LipchipDriveUpdateResponse {
  moveId?: string | null;
  hisaHorseId?: string | null;
  locationId?: string | null;
  geoLocation?: string | null;
  /** @format date-time */
  timestamp?: string;
}

export interface LipchipPickupRequest {
  moveId?: string | null;
  licensePlate?: string | null;
  driverName?: string | null;
  hisaHorseId?: string | null;
  originLocationId?: string | null;
  destinationLocationId?: string | null;
  notes?: string | null;
  originGeoLocation?: string | null;
  destinationGeoLocation?: string | null;
  /** @format date-time */
  timestamp?: string | null;
  attachments?: LipchipAttachmentModel[] | null;
}

export interface LipchipPickupResponse {
  moveId?: string | null;
  licensePlate?: string | null;
  driverName?: string | null;
  hisaHorseId?: string | null;
  originLocationId?: string | null;
  destinationLocationId?: string | null;
  notes?: string | null;
  originGeoLocation?: string | null;
  destinationGeoLocation?: string | null;
  /** @format date-time */
  timestamp?: string | null;
  attachments?: LipchipAttachmentModel[] | null;
}

export interface LocationAccreditation {
  status?: LocationAccreditationStatus;
  /** @format date */
  expires?: string | null;
}

export interface LocationAccreditationModel {
  status?: LocationAccreditationStatus;
  /** @format date-time */
  expires?: string | null;
}

export interface LocationAddressResponse {
  street?: string | null;
  city?: string | null;
  state?: string | null;
  zipPostalCode?: string | null;
  country?: string | null;
  unitAptBoxNumber?: string | null;
  /** @format int32 */
  locationAddressId?: number;
}

export interface LocationAppointmentCreateRequest {
  /** @format int32 */
  slotId?: number;
  /** @format date */
  date?: string;
}

export interface LocationAppointmentResponse {
  /** @format int32 */
  locationAppointmentId?: number;
  locationId?: string | null;
  /** @format int32 */
  locationSlotId?: number | null;
  /** @format date */
  date?: string;
  timeRange?: TimeOnlyRange | null;
  locationScheduleType?: LocationScheduleType;
  name?: string | null;
}

export interface LocationAutocompleteDto {
  locationId?: string | null;
  address?: Address | null;
  trackCode?: string[] | null;
  type?: LocationType;
  email?: string | null;
  phone?: string | null;
  webSite?: string | null;
  name?: string | null;
  accreditation?: LocationAccreditation | null;
  defaultDesignatedOwner?: string | null;
  defaultResponsiblePerson?: string | null;
  defaultVet?: string | null;
}

export interface LocationAvailableDate {
  isActive?: boolean;
  slots?: LocationSlot[] | null;
}

export interface LocationAvailableDateResponse {
  dates?: Record<string, LocationAvailableDate>;
}

export interface LocationContactCreateRequest {
  type?: LocationContactType;
  /** @maxLength 200 */
  name?: string | null;
  /**
   * @format email
   * @maxLength 200
   */
  email?: string | null;
  /** @maxLength 20 */
  mobileNumber?: string | null;
  notes?: string | null;
}

export interface LocationContactResponse {
  /** @format int32 */
  locationContactId?: number;
  locationId?: string | null;
  type?: LocationContactType;
  name?: string | null;
  email?: string | null;
  mobileNumber?: string | null;
  notes?: string | null;
}

export interface LocationContactUpdateRequest {
  type?: LocationContactType;
  /** @maxLength 200 */
  name?: string | null;
  /**
   * @format email
   * @maxLength 200
   */
  email?: string | null;
  /** @maxLength 20 */
  mobileNumber?: string | null;
  notes?: string | null;
}

export interface LocationCreateRequest {
  hisaAdmin?: string | null;
  regulatoryVets?: LocationPersonDateRangeModel[] | null;
  associationVets?: LocationPersonDateRangeModel[] | null;
  stewards?: LocationPersonDateRangeModel[] | null;
  trackStallSuperintendent?: LocationPersonDateRangeModel[] | null;
  horseshoeInspectors?: LocationPersonDateRangeModel[] | null;
  distributionLists?: LocationDistributionLists | null;
  claimingClerk?: string[] | null;
  rswc?: LocationRswc | null;
  address?: Address | null;
  trackCode?: string[] | null;
  type?: LocationType;
  accreditation?: LocationAccreditationModel | null;
  name?: string | null;
  email?: string | null;
  phone?: string | null;
  webSite?: string | null;
  srcTracks?: string[] | null;
  srcLocationId?: string | null;
  management?: string[] | null;
  staff?: string[] | null;
  trackAgreementSigned?: boolean;
  hisaRegulated?: boolean;
  isLocked?: boolean;
  hisaStateAgreementStatus?: LocationHisaAgreementStatus;
  hisaRepresentative?: string | null;
  defaultDesignatedOwner?: string | null;
  defaultResponsiblePerson?: string | null;
  defaultVet?: string | null;
  /** @uniqueItems true */
  admin?: string[] | null;
  /** @format date */
  trackAgreementSignDate?: string | null;
  meetAtTrack?: LocationMeetAtTrackModel[] | null;
  ignoreForAutocomplete?: boolean;
  latLng?: string | null;
  vetIds?: string[] | null;
  ownerIds?: string[] | null;
}

export interface LocationDistributionLists {
  catastrophicInjury?: string[] | null;
  violations?: string[] | null;
  disqualified?: string[] | null;
  enforcementTeam?: string[] | null;
  canceledClaim?: string[] | null;
  rscCommittee?: string[] | null;
  isDisplayed?: boolean;
  hisaBackOffice?: string[] | null;
  afterCareCreated?: string[] | null;
  executive?: string[] | null;
  iaChanged?: string[] | null;
  appAccess?: string[] | null;
  horsesAtRisk?: string[] | null;
  workoutViolations?: string[] | null;
}

export interface LocationMeetAtTrackModel {
  /** @format date-time */
  startDate?: string;
  /** @format date-time */
  stopDate?: string;
  raceDaysOfWeek?: DayOfWeek[] | null;
  excludedDates?: string[] | null;
  additionalDates?: string[] | null;
}

export interface LocationNameSearch {
  locationId?: string | null;
  name?: string | null;
}

export interface LocationPersonDateRangeModel {
  /** @minLength 1 */
  hisaPersonId: string;
  /** @format date */
  startDate?: string | null;
  /** @format date */
  endDate?: string | null;
}

export interface LocationResponse {
  hisaAdmin?: string | null;
  regulatoryVets?: LocationPersonDateRangeModel[] | null;
  associationVets?: LocationPersonDateRangeModel[] | null;
  stewards?: LocationPersonDateRangeModel[] | null;
  trackStallSuperintendent?: LocationPersonDateRangeModel[] | null;
  horseshoeInspectors?: LocationPersonDateRangeModel[] | null;
  distributionLists?: LocationDistributionLists | null;
  claimingClerk?: string[] | null;
  rswc?: LocationRswc | null;
  address?: Address | null;
  trackCode?: string[] | null;
  type?: LocationType;
  accreditation?: LocationAccreditationModel | null;
  name?: string | null;
  email?: string | null;
  phone?: string | null;
  webSite?: string | null;
  srcTracks?: string[] | null;
  srcLocationId?: string | null;
  management?: string[] | null;
  staff?: string[] | null;
  trackAgreementSigned?: boolean;
  hisaRegulated?: boolean;
  isLocked?: boolean;
  hisaStateAgreementStatus?: LocationHisaAgreementStatus;
  hisaRepresentative?: string | null;
  defaultDesignatedOwner?: string | null;
  defaultResponsiblePerson?: string | null;
  defaultVet?: string | null;
  /** @uniqueItems true */
  admin?: string[] | null;
  /** @format date */
  trackAgreementSignDate?: string | null;
  meetAtTrack?: LocationMeetAtTrackModel[] | null;
  ignoreForAutocomplete?: boolean;
  latLng?: string | null;
  vetIds?: string[] | null;
  ownerIds?: string[] | null;
  locationId?: string | null;
}

export interface LocationRswc {
  associationVet?: string[] | null;
  horsemanRep?: string[] | null;
  jockeyRep?: string[] | null;
  medicalDirector?: string[] | null;
  racingSecretary?: string[] | null;
  regulatoryVet?: string[] | null;
  safetyOfficer?: string[] | null;
  trackSuper?: string[] | null;
  trainerRep?: string[] | null;
  safetyDirector?: string[] | null;
  horseshoeInspector?: string[] | null;
}

export interface LocationScheduleCreateRequest {
  dateRange: DateRange;
  week: LocationScheduleWeek;
}

export interface LocationScheduleExceptionRequest {
  isActive?: boolean;
  /** @format date */
  date?: string;
}

export interface LocationScheduleExceptionResponse {
  /** @format int32 */
  locationScheduleExceptionId?: number;
  /** @format date */
  date?: string;
  isActive?: boolean;
}

export interface LocationScheduleExceptionUpdateRequest {
  /** @format date */
  date?: string;
  isActive?: boolean;
}

export interface LocationSchedulePatchRequest {
  dateRange?: DateRange | null;
  week?: LocationScheduleWeek | null;
}

export interface LocationScheduleResponse {
  /** @format int32 */
  locationScheduleId?: number;
  dateRange?: DateRange | null;
  week?: LocationScheduleWeek | null;
}

export interface LocationScheduleWeek {
  sunday: DayDetails;
  monday: DayDetails;
  tuesday: DayDetails;
  wednesday: DayDetails;
  thursday: DayDetails;
  friday: DayDetails;
  saturday: DayDetails;
}

export interface LocationSearchResponse {
  hisaAdmin?: string | null;
  locationId?: string | null;
  address?: Address | null;
  trackCode?: string | null;
  type?: LocationType;
  email?: string | null;
  phone?: string | null;
  webSite?: string | null;
  name?: string | null;
  accreditation?: LocationAccreditationModel | null;
  regulatoryVets?: LocationPersonDateRangeModel[] | null;
  associationVets?: LocationPersonDateRangeModel[] | null;
  claimingClerk?: string[] | null;
  stewards?: LocationPersonDateRangeModel[] | null;
  distributionLists?: LocationDistributionLists | null;
  rswc?: LocationRswc | null;
  management?: string[] | null;
  staff?: string[] | null;
  hisaRepresentative?: string | null;
  hisaRegulated?: boolean;
  defaultDesignatedOwner?: string | null;
  defaultResponsiblePerson?: string | null;
  defaultVet?: string | null;
  /** @uniqueItems true */
  admin?: string[] | null;
  ignoreForAutocomplete?: boolean;
  /** @format date-time */
  createdDateTime?: string;
  latLng?: string | null;
  vetIds?: string[] | null;
  ownerIds?: string[] | null;
}

export interface LocationSearchWithPermissionResponse {
  hisaAdmin?: string | null;
  locationId?: string | null;
  address?: Address | null;
  trackCode?: string | null;
  type?: LocationType;
  email?: string | null;
  phone?: string | null;
  webSite?: string | null;
  name?: string | null;
  accreditation?: LocationAccreditationModel | null;
  regulatoryVets?: LocationPersonDateRangeModel[] | null;
  associationVets?: LocationPersonDateRangeModel[] | null;
  claimingClerk?: string[] | null;
  stewards?: LocationPersonDateRangeModel[] | null;
  distributionLists?: LocationDistributionLists | null;
  rswc?: LocationRswc | null;
  management?: string[] | null;
  staff?: string[] | null;
  hisaRepresentative?: string | null;
  hisaRegulated?: boolean;
  defaultDesignatedOwner?: string | null;
  defaultResponsiblePerson?: string | null;
  defaultVet?: string | null;
  /** @uniqueItems true */
  admin?: string[] | null;
  ignoreForAutocomplete?: boolean;
  /** @format date-time */
  createdDateTime?: string;
  latLng?: string | null;
  vetIds?: string[] | null;
  ownerIds?: string[] | null;
  /** @uniqueItems true */
  permissions?: string[] | null;
}

export interface LocationSlot {
  /** @format int32 */
  id?: number;
  name?: string | null;
  /** @format int32 */
  capacity?: number;
  /** @format int32 */
  availableCapacity?: number;
  timeRange?: TimeOnlyRange | null;
}

export interface LocationUpdateRequest {
  hisaAdmin?: string | null;
  regulatoryVets?: LocationPersonDateRangeModel[] | null;
  associationVets?: LocationPersonDateRangeModel[] | null;
  stewards?: LocationPersonDateRangeModel[] | null;
  trackStallSuperintendent?: LocationPersonDateRangeModel[] | null;
  horseshoeInspectors?: LocationPersonDateRangeModel[] | null;
  distributionLists?: LocationDistributionLists | null;
  claimingClerk?: string[] | null;
  rswc?: LocationRswc | null;
  address?: Address | null;
  trackCode?: string[] | null;
  type?: LocationType;
  accreditation?: LocationAccreditationModel | null;
  name?: string | null;
  email?: string | null;
  phone?: string | null;
  webSite?: string | null;
  srcTracks?: string[] | null;
  srcLocationId?: string | null;
  management?: string[] | null;
  staff?: string[] | null;
  trackAgreementSigned?: boolean;
  hisaRegulated?: boolean;
  isLocked?: boolean;
  hisaStateAgreementStatus?: LocationHisaAgreementStatus;
  hisaRepresentative?: string | null;
  defaultDesignatedOwner?: string | null;
  defaultResponsiblePerson?: string | null;
  defaultVet?: string | null;
  /** @uniqueItems true */
  admin?: string[] | null;
  /** @format date */
  trackAgreementSignDate?: string | null;
  meetAtTrack?: LocationMeetAtTrackModel[] | null;
  ignoreForAutocomplete?: boolean;
  latLng?: string | null;
  vetIds?: string[] | null;
  ownerIds?: string[] | null;
}

export interface LogSearchEntry {
  /** @format date-time */
  timestamp?: string;
  message?: string | null;
  messageId?: string | null;
  contextId?: string | null;
}

export interface MailAction {
  action?: MailingAction;
  /** @format date-time */
  date?: string;
  madeBy?: string | null;
}

export interface MailActionResponse {
  message?: string | null;
  allowedActions?: string[] | null;
  additionalData?: any;
}

export interface MailMessageAllowedActionsModel {
  actionType?: string | null;
  actionData?: any;
}

export interface MailMessageModel {
  /** @format uuid */
  messageId?: string;
  /** @format date-time */
  createdDateTime?: string;
  createdDate?: string | null;
  fromId?: string | null;
  fromName?: string | null;
  receiverId?: string | null;
  locationId?: string | null;
  locationName?: string | null;
  horseId?: string | null;
  horseName?: string | null;
  title?: string | null;
  body?: string | null;
  allowedActions?: MailMessageAllowedActionsModel[] | null;
  mailActions?: MailAction[] | null;
  messageType?: MailMessageType;
  mailMessageType?: string | null;
  /** @format date-time */
  readDateTime?: string | null;
  /** @format date-time */
  deletedDateTime?: string | null;
  additinalData?: Record<string, string>;
  mailStatus?: MailStatusModel | null;
}

export interface MailSearchModel {
  searchText?: string | null;
  field?: string | null;
}

export interface MailStatusItem {
  value?: boolean;
  /** @format date-time */
  date?: string | null;
  madeBy?: string | null;
}

export interface MailStatusModel {
  read?: MailStatusItem | null;
  archived?: MailStatusItem | null;
  deleted?: MailStatusItem | null;
  todo?: MailStatusItem | null;
  completed?: MailStatusItem | null;
}

export interface MeasurePair {
  measureName?: string | null;
  measureValue?: string | null;
}

export interface MedicalRecordFilterQuery {
  /** @format int32 */
  page?: number;
  /** @format int32 */
  pageSize?: number;
  sortBy?: string | null;
  /** @format int32 */
  sortDirection?: number;
  isAscSort?: boolean;
  /** @format date-time */
  startDate: string;
  /** @format date-time */
  endDate: string;
}

export interface MeetStatisticModel {
  /** @format int32 */
  numberOfRacingFatalities?: number | null;
  /** @format int32 */
  numberOfHumanInjuries?: number | null;
  /** @format int32 */
  numberOfTrainingFatalities?: number | null;
  /** @format int32 */
  numberOfEquineInjuries?: number | null;
  /** @format int32 */
  numberOfOtherFatalities?: number | null;
  /** @format int32 */
  numberOfVoidClaims?: number | null;
  /** @format int32 */
  numberOfVetInspectionScratches?: number | null;
  /** @format int32 */
  numberOfRrmcMeetings?: number | null;
}

export interface MemberInfo {
  memberType?: MemberTypes;
  name?: string | null;
  declaringType?: Type | null;
  reflectedType?: Type | null;
  module?: Module | null;
  customAttributes?: CustomAttributeData[] | null;
  isCollectible?: boolean;
  /** @format int32 */
  metadataToken?: number;
}

export interface MessageSenderQuery {
  /** @minLength 1 */
  personId: string;
  title?: string | null;
  /** @minLength 1 */
  message: string;
  method?: MessageSenderMethod | null;
}

export interface MessageTemplateRequest {
  messageTemplateId?: string | null;
  layoutTemplateId?: string | null;
  textTitle?: string | null;
  textBody?: string | null;
  emailTitle?: string | null;
  emailBody?: string | null;
  smsBody?: string | null;
  isEmailEnabled?: boolean;
  isInternalEnabled?: boolean;
  isSmsEnabled?: boolean;
  senderType?: MessageTemplateSenderType;
  availableVars?: string[] | null;
  isMandatory?: boolean;
  isSystem?: boolean;
}

export interface MessageTemplateResponse {
  messageTemplateId?: string | null;
  layoutTemplateId?: string | null;
  textTitle?: string | null;
  textBody?: string | null;
  emailTitle?: string | null;
  emailBody?: string | null;
  smsBody?: string | null;
  isEmailEnabled?: boolean;
  isInternalEnabled?: boolean;
  isSmsEnabled?: boolean;
  senderType?: MessageTemplateSenderType;
  availableVars?: string[] | null;
  isMandatory?: boolean;
  isSystem?: boolean;
}

export interface MethodBase {
  memberType?: MemberTypes;
  name?: string | null;
  declaringType?: Type | null;
  reflectedType?: Type | null;
  module?: Module | null;
  customAttributes?: CustomAttributeData[] | null;
  isCollectible?: boolean;
  /** @format int32 */
  metadataToken?: number;
  attributes?: MethodAttributes;
  methodImplementationFlags?: MethodImplAttributes;
  callingConvention?: CallingConventions;
  isAbstract?: boolean;
  isConstructor?: boolean;
  isFinal?: boolean;
  isHideBySig?: boolean;
  isSpecialName?: boolean;
  isStatic?: boolean;
  isVirtual?: boolean;
  isAssembly?: boolean;
  isFamily?: boolean;
  isFamilyAndAssembly?: boolean;
  isFamilyOrAssembly?: boolean;
  isPrivate?: boolean;
  isPublic?: boolean;
  isConstructedGenericMethod?: boolean;
  isGenericMethod?: boolean;
  isGenericMethodDefinition?: boolean;
  containsGenericParameters?: boolean;
  methodHandle?: RuntimeMethodHandle;
  isSecurityCritical?: boolean;
  isSecuritySafeCritical?: boolean;
  isSecurityTransparent?: boolean;
}

export interface MethodInfo {
  name?: string | null;
  declaringType?: Type | null;
  reflectedType?: Type | null;
  module?: Module | null;
  customAttributes?: CustomAttributeData[] | null;
  isCollectible?: boolean;
  /** @format int32 */
  metadataToken?: number;
  attributes?: MethodAttributes;
  methodImplementationFlags?: MethodImplAttributes;
  callingConvention?: CallingConventions;
  isAbstract?: boolean;
  isConstructor?: boolean;
  isFinal?: boolean;
  isHideBySig?: boolean;
  isSpecialName?: boolean;
  isStatic?: boolean;
  isVirtual?: boolean;
  isAssembly?: boolean;
  isFamily?: boolean;
  isFamilyAndAssembly?: boolean;
  isFamilyOrAssembly?: boolean;
  isPrivate?: boolean;
  isPublic?: boolean;
  isConstructedGenericMethod?: boolean;
  isGenericMethod?: boolean;
  isGenericMethodDefinition?: boolean;
  containsGenericParameters?: boolean;
  methodHandle?: RuntimeMethodHandle;
  isSecurityCritical?: boolean;
  isSecuritySafeCritical?: boolean;
  isSecurityTransparent?: boolean;
  memberType?: MemberTypes;
  returnParameter?: ParameterInfo | null;
  returnType?: Type | null;
  returnTypeCustomAttributes?: ICustomAttributeProvider | null;
}

export interface MistakenRetirement {
  mistakenRetirementId?: string | null;
}

export interface MlHorseMedical {
  locationId?: string | null;
  horseLocationId?: string | null;
  hisaHorseId?: string | null;
  designatedOwner?: string | null;
  responsibleHisaPersonId?: string | null;
  treatingHisaPersonId?: string | null;
  attendingVet?: string | null;
  /** @format date */
  date?: string;
  /**
   * @format time
   * @pattern ([0-9]{2}):(?:[0-9]{2}):([0-9]{2})
   */
  time?: string | null;
  clearedToWork?: boolean;
  clearedToRace?: boolean;
  recType: HorseMedicalRecType;
  vaccine?: string | null;
  drugName?: string | null;
  drugRoute?: HorseMedicalRouteAdmin;
  drugDosage?: string | null;
  procedure?: string | null;
  surgery?: string | null;
  dental?: string | null;
  physiotherapy?: string | null;
  chiropractic?: string | null;
  conditionTreated?: string | null;
  modality?: string | null;
  testName?: string | null;
  necropsyCategory?: string | null;
  testResults?: string | null;
  limbTreated?: string | null;
  notes?: string | null;
  associatedDocumentUrls?: string[] | null;
  preRace?: HorseMedicalPreRaceModel | null;
  structure?: string | null;
  description?: string | null;
  relatedVetsListId?: string | null;
  classifiedAs?: string | null;
  deleteReason?: string | null;
  retireReason?: HorseRetireReason | null;
  /** @format date */
  dateOfDeath?: string | null;
  deathReason?: HorseDeathReason | null;
  latLng?: string | null;
  drugPerscribingVetHisaId?: string | null;
  treatingPersonRole?: string | null;
  inspection?: InspectionModel | null;
  category?: string | null;
  internalNotes?: string | null;
  includeInStatus?: boolean | null;
  qcStatus?: QCStatus | null;
}

export interface MlHorseMedicalRequest {
  recBody: MlHorseMedical;
  /** @minLength 1 */
  recType: string;
}

export interface MlResponse {
  entities?: Entity[] | null;
  classifiedRecordTypes?: string[] | null;
}

export interface Module {
  assembly?: Assembly | null;
  fullyQualifiedName?: string | null;
  name?: string | null;
  /** @format int32 */
  mdStreamVersion?: number;
  /** @format uuid */
  moduleVersionId?: string;
  scopeName?: string | null;
  moduleHandle?: ModuleHandle;
  customAttributes?: CustomAttributeData[] | null;
  /** @format int32 */
  metadataToken?: number;
}

export interface ModuleHandle {
  /** @format int32 */
  mdStreamVersion?: number;
}

export interface MoneyOwedResponse {
  moneyOwed?: boolean;
}

export interface Multilingual {
  english?: string | null;
  spanish?: string | null;
}

export interface NoteModel {
  /** @minLength 1 */
  noteText: string;
  noteUrl?: string | null;
  /** @minLength 1 */
  noteStage: string;
}

export interface NotesDescriptions {
  note?: string | null;
  /** @format date */
  date?: string;
  managerId?: string | null;
}

export interface NotificationDistributionRequest {
  listOfPeople?: string[] | null;
  listOfTypes?: TypeForNotificationDistribution[] | null;
  templateId?: string | null;
}

export interface NotificationDistributionResponse {
  listOfPeople?: string[] | null;
  listOfTypes?: TypeForNotificationDistribution[] | null;
  templateId?: string | null;
  notificationDistributionId?: string | null;
  /** @format date */
  date?: string;
}

export interface NotificationLogSearchResponse {
  id?: string | null;
  notificationType?: NotificationType;
  fileKey?: string | null;
  eventTypes?: string[] | null;
  /** @format date-time */
  eventTimestamp?: string;
  messageId?: string | null;
  tags?: Record<string, string>;
  source?: string | null;
  destination?: string | null;
  subject?: string | null;
  destinationPersonId?: string | null;
  messageTemplateId?: string | null;
  secureMailId?: string | null;
  horseId?: string | null;
  locationId?: string | null;
}

export interface NotificationTarget {
  type?: NotificationTargetType;
  name?: string | null;
}

export interface OptionalQuestionModel {
  /** @format int32 */
  questionNumber?: number;
  question?: string | null;
  answer?: string | null;
}

export interface OrderRequest {
  /** @format uuid */
  orderId?: string;
  orderCode?: string | null;
  /** @minLength 1 */
  personName: string;
  personEmail?: string | null;
  /** @minLength 1 */
  personId: string;
  /** @minLength 1 */
  horseName: string;
  /** @minLength 1 */
  horseId: string;
  /**
   * @format date
   * @minLength 1
   */
  orderDate: string;
  /** @format date */
  dueDate: string;
  invoiceId?: string | null;
  /** @minItems 1 */
  products: Product[];
  /** @format double */
  totalAmount?: number;
  /** @format double */
  paidAmount?: number;
  orderStatus?: OrderStatus;
  manualPaid?: boolean;
  invoices?: StripeInvoice[] | null;
  receipts?: StripeReceipt[] | null;
  stripePaymentLink?: string | null;
  isDeleted?: boolean;
  activity?: RecordActivity | null;
  uuid?: string | null;
}

export interface OrderResponse {
  /** @format uuid */
  orderId?: string;
  orderCode?: string | null;
  personName: string | null;
  personEmail?: string | null;
  personId: string | null;
  horseName: string | null;
  horseId: string | null;
  /** @format date */
  orderDate: string;
  /** @format date */
  dueDate: string;
  invoiceId?: string | null;
  products: Product[] | null;
  /** @format double */
  totalAmount?: number;
  /** @format double */
  paidAmount?: number;
  orderStatus?: OrderStatus;
  manualPaid?: boolean;
  invoices?: StripeInvoice[] | null;
  receipts?: StripeReceipt[] | null;
  stripePaymentLink?: string | null;
  isDeleted?: boolean;
  activity?: RecordActivity | null;
  uuid?: string | null;
}

export interface OtherFields {
  /** @format date-time */
  date?: string;
  fields?: Record<string, string>;
}

export interface PaginationResponse {
  /** @format int32 */
  totalCount?: number;
  /** @format int32 */
  totalPages?: number;
  /** @format int32 */
  page?: number;
  /** @format int32 */
  pageSize?: number;
}

export interface ParameterInfo {
  attributes?: ParameterAttributes;
  member?: MemberInfo | null;
  name?: string | null;
  parameterType?: Type | null;
  /** @format int32 */
  position?: number;
  isIn?: boolean;
  isLcid?: boolean;
  isOptional?: boolean;
  isOut?: boolean;
  isRetval?: boolean;
  defaultValue?: any;
  rawDefaultValue?: any;
  hasDefaultValue?: boolean;
  customAttributes?: CustomAttributeData[] | null;
  /** @format int32 */
  metadataToken?: number;
}

export interface PaymentRequest {
  /** @minLength 1 */
  personId: string;
  rulingId?: string | null;
  actionCode?: string | null;
  /** @format uuid */
  orderId?: string;
  orderCode?: string | null;
  /** @format int64 */
  amount: number;
  stripeInvoiceNumber?: string | null;
}

export interface PaymentResponse {
  personId?: string | null;
  rulingId?: string | null;
  actionCode?: string | null;
  /** @format uuid */
  orderId?: string;
  orderCode?: string | null;
  /** @format int64 */
  amount?: number;
  stripeInvoiceNumber?: string | null;
  paymentId: string | null;
  paymentType?: PaymentType;
  /** @format date-time */
  paymentDate?: string;
}

export interface PersonActivitiesResponse {
  /** @format date */
  lastStartDate?: string | null;
  /** @format date */
  nextStartDate?: string | null;
}

export interface PersonCanRaceByArrayRequest {
  /** @minItems 1 */
  array: CanRacePersonRequest[];
  /** @format date */
  date?: string | null;
}

export interface PersonCognitoResponse {
  hisaPersonId?: string | null;
  mobileNumber?: string | null;
  email?: string | null;
  userName?: string | null;
  userStatus?: string | null;
  emailVerified?: boolean;
  mobileNumberVerified?: boolean;
  cognitoHisaPersonId?: string | null;
}

export interface PersonComment {
  commentType?: CommentType;
  /** @format date-time */
  dateTime?: string;
  personCommentary?: string | null;
  personId?: string | null;
  isAgree?: boolean;
}

export interface PersonCredentialsResponse {
  regVet?: boolean;
}

export interface PersonFromOwnerRequest {
  firstName?: string | null;
  lastName?: string | null;
  middleName?: string | null;
  suffix?: string | null;
}

export interface PersonHistorySearchResponse {
  hisaPersonId?: string | null;
  name?: PersonName | null;
  /** @format date */
  birthDate?: string | null;
  /** @format date */
  lastStartDate?: string | null;
  /** @format date */
  nextStartDate?: string | null;
  address?: CoveredPersonAddress | null;
  mobileNumber?: string | null;
  email?: string | null;
  userName?: string | null;
  isActive?: boolean;
  displayName?: string | null;
  associatedVets?: string[] | null;
  tjcIds?: TjcTjcIdModel[] | null;
  roles?: string[] | null;
  rolesOther?: string | null;
  sharedHorseIds?: string[] | null;
  finesOwed?: boolean;
  feesOwed?: boolean;
  tjcUpdateStatus?: TjcTjcUpdateStatus;
  tjcUpdateDetails?: string | null;
  isCoveredPerson?: boolean;
  barredFromRacing?: boolean;
  fitToRide?: boolean;
  isUnregisteredPerson?: boolean;
  /** @format date */
  lastPhysical?: string | null;
  /** @format date */
  baselineConcussion?: string | null;
  isHeadcheckRegistered?: boolean;
  trackConcussionAck?: string[] | null;
  vetLicenseStates?: StateLicenseId[] | null;
  vetLicenseOther?: boolean;
  vetLicenseAcademic?: boolean;
  raceCommissionLicenseAcademic?: string | null;
  raceCommissionLicenseOther?: string | null;
  jockeyAgentId?: string | null;
  pinCode?: string | null;
  /** @format date-time */
  createdDateTime?: string;
  ignoreForAutocomplete?: boolean;
  nominatedPersonId?: string | null;
  isGeneralNotificationsActive?: boolean;
  isNewsNotificationsActive?: boolean;
  mergedPersonIds?: string[] | null;
  id?: string | null;
  /** @format date */
  raceHistoryDate?: string | null;
  raceDates?: string[] | null;
}

export interface PersonMatchRequest {
  firstName?: string | null;
  lastName?: string | null;
  type?: string | null;
  /** @format date */
  dob?: string;
  state?: string | null;
  licenseNumber?: string | null;
}

export interface PersonMatchResponse {
  firstName?: string | null;
  lastName?: string | null;
  middleName?: string | null;
  type?: string[] | null;
  tjcType?: string[] | null;
  tjcReferenceNumber?: number[] | null;
  hisaId?: string[] | null;
  activity?: PersonMatchResponseActivity[] | null;
  arciFirstName?: string | null;
  arciLastName?: string | null;
  /** @format int64 */
  arciReferenceNumber?: number | null;
  statesLicensedIn?: string[] | null;
  roles?: string[] | null;
}

export interface PersonMatchResponseActivity {
  lastTrackId?: string | null;
  lastCountry?: string | null;
  /** @format date */
  lastRaceDate?: string | null;
}

export interface PersonName {
  prefix?: string | null;
  firstName?: string | null;
  middleName?: string | null;
  lastName?: string | null;
  suffix?: string | null;
  additionalLastName?: string | null;
}

export interface PersonNameSearchResponse {
  hisaPersonId?: string | null;
  displayName?: string | null;
}

export interface PersonOdooRequest {
  hisaPersonId?: string | null;
  name?: PersonName | null;
  /** @format date */
  birthDate?: string | null;
  /** @format date */
  lastStartDate?: string | null;
  /** @format date */
  nextStartDate?: string | null;
  address?: CoveredPersonAddress | null;
  mobileNumber?: string | null;
  email?: string | null;
  userName?: string | null;
  stateLicenseId?: StateLicenseId[] | null;
  roles?: string[] | null;
  rolesOther?: string | null;
  finesOwed?: boolean;
  feesOwed?: boolean;
  isActive?: boolean;
  sharedHorseIds?: string[] | null;
  uuid?: string | null;
  tjcIds?: TjcTjcIdModel[] | null;
  tjcUpdateStatus?: TjcTjcUpdateStatus;
  tjcUpdateDetails?: string | null;
  displayName?: string | null;
  isCoveredPerson?: boolean;
  barredFromRacing?: boolean;
  fitToRide?: boolean;
  isUnregisteredPerson?: boolean;
  /** @format date */
  lastPhysical?: string | null;
  /** @format date */
  baselineConcussion?: string | null;
  isHeadcheckRegistered?: boolean;
  trackConcussionAck?: string[] | null;
  vetLicenseStates?: StateLicenseId[] | null;
  vetLicenseOther?: boolean;
  raceCommissionLicenseOther?: string | null;
  vetLicenseAcademic?: boolean;
  raceCommissionLicenseAcademic?: string | null;
  jockeyAgentId?: string | null;
  pinCode?: string | null;
  nominatedPersonId?: string | null;
  activity?: RecordActivity | null;
  associatedVets?: string[] | null;
  ignoreForAutocomplete?: boolean;
  isGeneralNotificationsActive?: boolean;
  isNewsNotificationsActive?: boolean;
  mergedPersonIds?: string[] | null;
  id?: string | null;
  /** @uniqueItems true */
  mailGroups?: string[] | null;
}

export interface PersonResponse {
  hisaPersonId?: string | null;
  name?: PersonName | null;
  /** @format date */
  birthDate?: string | null;
  /** @format date */
  lastStartDate?: string | null;
  /** @format date */
  nextStartDate?: string | null;
  address?: CoveredPersonAddress | null;
  mobileNumber?: string | null;
  email?: string | null;
  userName?: string | null;
  stateLicenseId?: StateLicenseId[] | null;
  roles?: string[] | null;
  rolesOther?: string | null;
  finesOwed?: boolean;
  feesOwed?: boolean;
  isActive?: boolean;
  sharedHorseIds?: string[] | null;
  uuid?: string | null;
  tjcIds?: TjcTjcIdModel[] | null;
  tjcUpdateStatus?: TjcTjcUpdateStatus;
  tjcUpdateDetails?: string | null;
  displayName?: string | null;
  isCoveredPerson?: boolean;
  barredFromRacing?: boolean;
  fitToRide?: boolean;
  isUnregisteredPerson?: boolean;
  /** @format date */
  lastPhysical?: string | null;
  /** @format date */
  baselineConcussion?: string | null;
  isHeadcheckRegistered?: boolean;
  trackConcussionAck?: string[] | null;
  vetLicenseStates?: StateLicenseId[] | null;
  vetLicenseOther?: boolean;
  raceCommissionLicenseOther?: string | null;
  vetLicenseAcademic?: boolean;
  raceCommissionLicenseAcademic?: string | null;
  jockeyAgentId?: string | null;
  pinCode?: string | null;
  nominatedPersonId?: string | null;
  activity?: RecordActivity | null;
  associatedVets?: string[] | null;
  ignoreForAutocomplete?: boolean;
  isGeneralNotificationsActive?: boolean;
  isNewsNotificationsActive?: boolean;
  mergedPersonIds?: string[] | null;
  id?: string | null;
}

export interface PersonRuling {
  hisaRulingId?: string | null;
  actionCode?: string | null;
  hisaPersonId?: string | null;
  personName?: string | null;
  violationDate?: string | null;
  locationId?: string | null;
  locationName?: string | null;
  /** @format double */
  fineAmount?: number;
  /** @format double */
  amountPaid?: number;
  dueDate?: string | null;
  finePaid?: boolean;
  status?: string | null;
  stage?: string | null;
  classification?: string | null;
  regulation?: string | null;
  rulingBody?: string | null;
}

export interface PersonScheduleCreateRequest {
  /** @format int32 */
  locationAppointmentId?: number | null;
  /** @format date-time */
  startDateTime?: string;
  /** @format date-time */
  endDateTime?: string;
  personId?: string | null;
  personScheduleType?: PersonScheduleTypeEnum;
}

export interface PersonScheduleResponse {
  /** @format int32 */
  personScheduleId?: number;
  /** @format int32 */
  locationAppointmentId?: number | null;
  /** @format date-time */
  startDateTime?: string;
  /** @format date-time */
  endDateTime?: string;
  personId?: string | null;
  personScheduleType?: PersonScheduleTypeEnum;
}

export interface PersonUpdateRequest {
  hisaPersonId?: string | null;
  name?: PersonName | null;
  /** @format date */
  birthDate?: string | null;
  /** @format date */
  lastStartDate?: string | null;
  /** @format date */
  nextStartDate?: string | null;
  address?: CoveredPersonAddress | null;
  mobileNumber?: string | null;
  email?: string | null;
  userName?: string | null;
  stateLicenseId?: StateLicenseId[] | null;
  roles?: string[] | null;
  rolesOther?: string | null;
  finesOwed?: boolean;
  feesOwed?: boolean;
  isActive?: boolean;
  sharedHorseIds?: string[] | null;
  uuid?: string | null;
  tjcIds?: TjcTjcIdModel[] | null;
  tjcUpdateStatus?: TjcTjcUpdateStatus;
  tjcUpdateDetails?: string | null;
  displayName?: string | null;
  isCoveredPerson?: boolean;
  barredFromRacing?: boolean;
  fitToRide?: boolean;
  isUnregisteredPerson?: boolean;
  /** @format date */
  lastPhysical?: string | null;
  /** @format date */
  baselineConcussion?: string | null;
  isHeadcheckRegistered?: boolean;
  trackConcussionAck?: string[] | null;
  vetLicenseStates?: StateLicenseId[] | null;
  vetLicenseOther?: boolean;
  raceCommissionLicenseOther?: string | null;
  vetLicenseAcademic?: boolean;
  raceCommissionLicenseAcademic?: string | null;
  jockeyAgentId?: string | null;
  pinCode?: string | null;
  nominatedPersonId?: string | null;
  activity?: RecordActivity | null;
  associatedVets?: string[] | null;
  ignoreForAutocomplete?: boolean;
  isGeneralNotificationsActive?: boolean;
  isNewsNotificationsActive?: boolean;
  mergedPersonIds?: string[] | null;
  id?: string | null;
}

export interface PersonUserNameResponse {
  userName?: string | null;
}

export interface PersonVetLicenseUrlResponse {
  documentId?: string | null;
  presignedURL?: string | null;
  filename?: string | null;
}

export interface PersonsInvolvedSearchDuplicates {
  /** @format date */
  violationDate?: string;
  locationId?: string | null;
  raceNumber?: string | null;
  personId?: string | null;
}

export interface PossibleAnswerModel {
  /** @minLength 1 */
  id: string;
  value?: string | null;
  name?: Multilingual | null;
}

export interface PostLayoffInfo {
  reportActionAllowed?: ReportActionAllowed | null;
  plrStatus?: PostLayoffReportStatus | null;
  /** @format date */
  dueDate?: string | null;
  /** @format date */
  expirationDate?: string | null;
  /** @format date */
  submissionDate?: string | null;
}

export interface PostLayoffReportAdminUpdateRequest {
  reportId?: string | null;
  statusUpdatedById?: string | null;
  adminNotes?: string | null;
  /** @format date */
  expirationDate?: string | null;
  statusUpdate?: PostLayoffReportStatusUpdateRequest | null;
  hisaSubmitterId?: string | null;
  intendedRace?: PostLayoffReportIntendedRaceUpdateRequest | null;
}

export interface PostLayoffReportAdvancedHorseModel {
  hisaId?: string | null;
  name?: string | null;
  hisaNameId?: string | null;
  canRace?: boolean;
  canRaceReason?: string | null;
  canWork?: boolean;
  canWorkReason?: string | null;
  isOnVetsList?: boolean;
  /** @format date */
  lastRaceDay?: string | null;
  /** @format int32 */
  daysSinceLastRace?: number | null;
}

export interface PostLayoffReportAdvancedSearchResponse {
  reportId?: string | null;
  submitter?: PostLayoffReportHisaEntityModel | null;
  status?: PostLayoffReportStatus;
  statusUpdatedBy?: PostLayoffReportHisaEntityModel | null;
  /** @format date-time */
  createdAt?: string | null;
  /** @format date */
  pendingSince?: string | null;
  /** @format date */
  submissionDate?: string | null;
  /** @format date */
  completionDate?: string | null;
  horse?: PostLayoffReportAdvancedHorseModel | null;
  owner?: PostLayoffReportHisaEntityModel | null;
  trainer?: PostLayoffReportHisaEntityModel | null;
  trainerMobileNumber?: string | null;
  trainerEmail?: string | null;
  treatingVet?: PostLayoffReportHisaEntityModel | null;
  location?: PostLayoffReportHisaEntityModel | null;
  lastRaceEntry?: PostLayoffReportRaceEntryModel | null;
  plannedRaceEntry?: PostLayoffReportRaceEntryModel | null;
  reportedTreatments?: PostLayoffReportTreatmentSearchModel[] | null;
  layoffReason?: string | null;
  additionalNotes?: string | null;
  isDeleted?: boolean;
}

export type PostLayoffReportAssociatedInjuriesModel = object;

export interface PostLayoffReportAssociatedRecordsResponse {
  postLayoffReportId?: string | null;
  medicalRecords?: PostLayoffReportMedicalRecordsModel | null;
  injuries?: PostLayoffReportAssociatedInjuriesModel | null;
  vetsLists?: PostLayoffReportAssociatedVetListsModel | null;
}

export type PostLayoffReportAssociatedVetListsModel = object;

export interface PostLayoffReportCreateRequest {
  horse?: PostLayoffReportHisaEntityModel | null;
  owner?: PostLayoffReportHisaEntityModel | null;
  trainer?: PostLayoffReportHisaEntityModel | null;
  trainerMobileNumber?: string | null;
  trainerEmail?: string | null;
  treatingVet?: PostLayoffReportHisaEntityModel | null;
  location?: PostLayoffReportHisaEntityModel | null;
  lastRaceEntry?: PostLayoffReportRaceEntryModel | null;
  plannedRaceEntry?: PostLayoffReportRaceEntryModel | null;
  reportedTreatments?: PostLayoffReportTreatmentModel[] | null;
  layoffReason?: string | null;
  otherLayoffReason?: string | null;
  notes?: string | null;
  additionalNotes?: string | null;
  submitter?: PostLayoffReportHisaEntityModel | null;
}

export interface PostLayoffReportHisaEntityModel {
  /** @minLength 1 */
  hisaId: string;
  name?: string | null;
  hisaNameId?: string | null;
}

export interface PostLayoffReportIntendedRaceUpdateRequest {
  hisaLocationId?: string | null;
  /** @format date */
  date?: string | null;
}

export interface PostLayoffReportMedicalRecordsModel {
  medications?: HorseMedicalResponse[] | null;
  injections?: HorseMedicalResponse[] | null;
  surgeries?: HorseMedicalResponse[] | null;
  shockwaves?: HorseMedicalResponse[] | null;
  remaining?: HorseMedicalResponse[] | null;
}

export interface PostLayoffReportProcedureModel {
  vet?: PostLayoffReportHisaEntityModel | null;
  /** @format date */
  date?: string;
  details?: string | null;
  hisaHorseMedicalId?: string | null;
}

export interface PostLayoffReportRaceEntryModel {
  location?: PostLayoffReportHisaEntityModel | null;
  /** @format date */
  date?: string | null;
}

export interface PostLayoffReportResponse {
  horse?: PostLayoffReportHisaEntityModel | null;
  owner?: PostLayoffReportHisaEntityModel | null;
  trainer?: PostLayoffReportHisaEntityModel | null;
  trainerMobileNumber?: string | null;
  trainerEmail?: string | null;
  treatingVet?: PostLayoffReportHisaEntityModel | null;
  location?: PostLayoffReportHisaEntityModel | null;
  lastRaceEntry?: PostLayoffReportRaceEntryModel | null;
  plannedRaceEntry?: PostLayoffReportRaceEntryModel | null;
  reportedTreatments?: PostLayoffReportTreatmentModel[] | null;
  layoffReason?: string | null;
  otherLayoffReason?: string | null;
  notes?: string | null;
  additionalNotes?: string | null;
  reportId?: string | null;
  submitter?: PostLayoffReportHisaEntityModel | null;
  status?: PostLayoffReportStatus;
  statusUpdatedBy?: PostLayoffReportHisaEntityModel | null;
  /** @format date-time */
  createdAt?: string | null;
  /** @format date */
  submissionDate?: string | null;
  /** @format date */
  pendingSince?: string | null;
  /** @format date */
  completionDate?: string | null;
  /** @format date */
  expirationDate?: string | null;
  adminNotes?: string | null;
  isDeleted?: boolean;
}

export interface PostLayoffReportSearchResponse {
  reportId?: string | null;
  submitter?: PostLayoffReportHisaEntityModel | null;
  status?: PostLayoffReportStatus;
  statusUpdatedBy?: PostLayoffReportHisaEntityModel | null;
  /** @format date */
  expirationDate?: string | null;
  /** @format date-time */
  createdAt?: string | null;
  /** @format date */
  pendingSince?: string | null;
  /** @format date */
  submissionDate?: string | null;
  /** @format date */
  completionDate?: string | null;
  horse?: PostLayoffReportHisaEntityModel | null;
  owner?: PostLayoffReportHisaEntityModel | null;
  trainer?: PostLayoffReportHisaEntityModel | null;
  trainerMobileNumber?: string | null;
  trainerEmail?: string | null;
  treatingVet?: PostLayoffReportHisaEntityModel | null;
  location?: PostLayoffReportHisaEntityModel | null;
  lastRaceEntry?: PostLayoffReportRaceEntryModel | null;
  plannedRaceEntry?: PostLayoffReportRaceEntryModel | null;
  reportedTreatments?: PostLayoffReportTreatmentSearchModel[] | null;
  layoffReason?: string | null;
  additionalNotes?: string | null;
  isDeleted?: boolean;
  otherLayoffReason?: string | null;
  notes?: string | null;
}

export interface PostLayoffReportStatusUpdateRequest {
  reportId?: string | null;
  status?: PostLayoffReportStatus;
}

export interface PostLayoffReportTreatmentModel {
  isReasonForLayoff?: boolean;
  kind?: PostLayoffTreatmentKind;
  /** @format date */
  date?: string;
  reason?: string | null;
  notes?: string | null;
  procedures?: PostLayoffReportProcedureModel[] | null;
}

export interface PostLayoffReportTreatmentSearchModel {
  isReasonForLayoff?: boolean;
  kind?: PostLayoffTreatmentKind;
}

export interface PostLayoffReportUpdateRequest {
  horse?: PostLayoffReportHisaEntityModel | null;
  owner?: PostLayoffReportHisaEntityModel | null;
  trainer?: PostLayoffReportHisaEntityModel | null;
  trainerMobileNumber?: string | null;
  trainerEmail?: string | null;
  treatingVet?: PostLayoffReportHisaEntityModel | null;
  location?: PostLayoffReportHisaEntityModel | null;
  lastRaceEntry?: PostLayoffReportRaceEntryModel | null;
  plannedRaceEntry?: PostLayoffReportRaceEntryModel | null;
  reportedTreatments?: PostLayoffReportTreatmentModel[] | null;
  layoffReason?: string | null;
  otherLayoffReason?: string | null;
  notes?: string | null;
  additionalNotes?: string | null;
  /** @minLength 1 */
  reportId: string;
}

export interface PreRaceModel {
  /** @minLength 1 */
  createdHisaPersonId: string;
  /**
   * @format date
   * @minLength 1
   */
  createdDate: string;
  latLng?: string | null;
  scratch?: boolean;
  reason?: string | null;
  inspectionVerify?: boolean;
  inspectionOverall?: boolean;
  inspectionJog?: boolean;
  inspectionPalpation?: boolean;
  notes?: NoteModel | null;
  cleared?: boolean;
}

export interface PresignedPost {
  url: string;
  fields: Record<string, string>;
  [key: string]: any;
}

export interface PresignedPostResponse {
  url?: string | null;
  fields?: Record<string, string>;
  additionalProperties?: Record<string, any>;
}

export interface ProblemDetails {
  type?: string | null;
  title?: string | null;
  /** @format int32 */
  status?: number | null;
  detail?: string | null;
  instance?: string | null;
  [key: string]: any;
}

export interface Product {
  /** @format uuid */
  productId: string;
  /** @minLength 1 */
  productName: string;
  /**
   * @format double
   * @min 0
   * @exclusiveMin true
   */
  price: number;
  productType: ProductType;
}

export interface PropertyInfo {
  name?: string | null;
  declaringType?: Type | null;
  reflectedType?: Type | null;
  module?: Module | null;
  customAttributes?: CustomAttributeData[] | null;
  isCollectible?: boolean;
  /** @format int32 */
  metadataToken?: number;
  memberType?: MemberTypes;
  propertyType?: Type | null;
  attributes?: PropertyAttributes;
  isSpecialName?: boolean;
  canRead?: boolean;
  canWrite?: boolean;
  getMethod?: MethodInfo | null;
  setMethod?: MethodInfo | null;
}

export interface PublicHoliday {
  /** @format date */
  date?: string;
  description?: string | null;
}

export interface QuestionAnswerDto {
  questionAnswerId?: string | null;
  questionnaireAnswerId?: string | null;
  responsiblePersonId?: string | null;
  question?: QuestionModel | null;
  questionPartAnswers?: QuestionPartAnswerDto[] | null;
  accreditationAudit?: AccreditationAudit | null;
  fileNames?: string[] | null;
  /** @format date-time */
  originalCreatedOn?: string;
  /** @format date-time */
  originalUpdatedOn?: string;
  originalId?: string | null;
  personComments?: PersonComment[] | null;
  accreditationTeamExecutiveSummary?: string | null;
  rscCareTrackExecutiveSummary?: string | null;
  rscChairBoardExecutiveSummary?: string | null;
  attachments?: FileAttachment[] | null;
  rscAudit?: RscAudit | null;
  responseFromTrack?: TrackResponse | null;
  isIncludedInCoverLetter?: boolean;
}

export interface QuestionFilterRequest {
  categories?: string[] | null;
  ruleNumbers?: string[] | null;
  orderNumbers?: number[] | null;
  sortExpressions?: SortExpression[] | null;
}

export interface QuestionModel {
  questionId?: string | null;
  questionnaireId?: string | null;
  category?: string | null;
  ruleNumber?: string | null;
  text?: Multilingual | null;
  regulationLinks?: string[] | null;
  documentLinks?: DocumentLink[] | null;
  questionParts?: QuestionPartModel[] | null;
  /** @format int32 */
  order?: number;
  questionCode?: string[] | null;
}

export interface QuestionPartAnswerDto {
  id?: string | null;
  answer?: string | null;
}

export interface QuestionPartModel {
  /** @minLength 1 */
  id: string;
  questionPartType?: QuestionPartType;
  name?: Multilingual | null;
  possibleAnswers?: PossibleAnswerModel[] | null;
}

export interface QuestionRequest {
  /** @minLength 1 */
  questionId: string;
  /** @minLength 1 */
  questionnaireId: string;
  category?: string | null;
  ruleNumber?: string | null;
  text?: Multilingual | null;
  regulationLinks?: string[] | null;
  documentLinks?: DocumentLink[] | null;
  questionParts?: QuestionPartModel[] | null;
  /** @format int32 */
  order?: number;
  questionCode?: string[] | null;
}

export interface QuestionResponse {
  questionId?: string | null;
  questionnaireId?: string | null;
  category?: string | null;
  ruleNumber?: string | null;
  text?: Multilingual | null;
  regulationLinks?: string[] | null;
  documentLinks?: DocumentLink[] | null;
  questionParts?: QuestionPartModel[] | null;
  /** @format int32 */
  order?: number;
  questionCode?: string[] | null;
}

export interface QuestionnaireAnswer {
  questionnaireAnswerId?: string | null;
  questionnaireId?: string | null;
  locationId?: string | null;
  personId?: string | null;
  questionnaireName?: string | null;
  questionnaireObjectType?: QuestionnaireObjectType;
  /** @format date */
  fillingDate?: string | null;
  isSubmitted?: boolean;
  isReadOnly?: boolean;
  isDeleted?: boolean;
  deleteReason?: string | null;
  activity?: RecordActivity | null;
  uuid?: string | null;
  accreditationTeamExecutiveSummary?: string | null;
  rscChairTrackExecutiveSummary?: string | null;
  rscChairBoardExecutiveSummary?: string | null;
  isAccreditationTeamExecutiveSummarySent?: boolean;
  isRscChairTrackExecutiveSummarySent?: boolean;
  isRscChairBoardExecutiveSummarySent?: boolean;
  coverLetterToTrackHeader?: string | null;
  coverLetterToTrackFooter?: string | null;
  isCoverLetterToTrackSend?: boolean;
}

export interface QuestionnaireAnswerDto {
  questionnaireAnswerId?: string | null;
  questionnaireId?: string | null;
  locationId?: string | null;
  personId?: string | null;
  questionnaireName?: string | null;
  questionnaireObjectType?: QuestionnaireObjectType;
  /** @format date */
  fillingDate?: string;
  isSubmitted?: boolean;
  isReadOnly?: boolean;
  accreditationTeamExecutiveSummary?: string | null;
  rscChairTrackExecutiveSummary?: string | null;
  rscChairBoardExecutiveSummary?: string | null;
  isAccreditationTeamExecutiveSummarySent?: boolean;
  isRscChairTrackExecutiveSummarySent?: boolean;
  isRscChairBoardExecutiveSummarySent?: boolean;
  coverLetterToTrackHeader?: string | null;
  coverLetterToTrackFooter?: string | null;
  isCoverLetterToTrackSend?: boolean;
}

export interface QuestionnaireAnswerRequest {
  questionnaireAnswerId?: string | null;
  questionnaireId?: string | null;
  locationId?: string | null;
  personId?: string | null;
  questionnaireName: string | null;
  questionnaireObjectType: QuestionnaireObjectType;
  /** @format date */
  fillingDate?: string | null;
  isSubmitted?: boolean;
  isReadOnly?: boolean;
  accreditationTeamExecutiveSummary?: string | null;
  rscChairTrackExecutiveSummary?: string | null;
  rscChairBoardExecutiveSummary?: string | null;
  isAccreditationTeamExecutiveSummarySent?: boolean;
  isRscChairTrackExecutiveSummarySent?: boolean;
  isRscChairBoardExecutiveSummarySent?: boolean;
  coverLetterToTrackHeader?: string | null;
  coverLetterToTrackFooter?: string | null;
  isCoverLetterToTrackSend?: boolean | null;
}

export interface QuestionnaireAnswerResponse {
  questionnaireAnswerId?: string | null;
  questionnaireId?: string | null;
  locationId?: string | null;
  personId?: string | null;
  questionnaireName: string | null;
  questionnaireObjectType: QuestionnaireObjectType;
  /** @format date */
  fillingDate?: string | null;
  isSubmitted?: boolean;
  isReadOnly?: boolean;
  accreditationTeamExecutiveSummary?: string | null;
  rscChairTrackExecutiveSummary?: string | null;
  rscChairBoardExecutiveSummary?: string | null;
  isAccreditationTeamExecutiveSummarySent?: boolean;
  isRscChairTrackExecutiveSummarySent?: boolean;
  isRscChairBoardExecutiveSummarySent?: boolean;
  coverLetterToTrackHeader?: string | null;
  coverLetterToTrackFooter?: string | null;
  isCoverLetterToTrackSend?: boolean | null;
}

export interface QuestionnaireDocumentRequest {
  reportType?: ReportType;
  sortOptions?: SortExpression[] | null;
  isExternal?: boolean;
}

export interface QuestionnaireRequest {
  /** @minLength 1 */
  id: string;
  name?: string | null;
  questionnaireObjectType?: QuestionnaireObjectType;
  isActive?: boolean;
  year?: string | null;
  isPublished?: boolean;
}

export interface QuestionnaireResponse {
  id?: string | null;
  name?: string | null;
  questionnaireObjectType?: QuestionnaireObjectType;
  isActive?: boolean;
  year?: string | null;
  isPublished?: boolean;
}

export interface RaceDayViewModel {
  hisaHorseId?: string | null;
  /** @format int32 */
  raceNumber?: number | null;
  isVoided?: boolean;
  isCompleteStatus?: boolean;
  isAllHorsesClamed?: boolean;
}

export interface RaceDistance {
  /** @format double */
  meters?: number | null;
  /** @format double */
  miles?: number | null;
  /** @format double */
  yards?: number | null;
  /** @format double */
  furlongs?: number | null;
}

export interface RaceEntriesDatesResponse {
  /** @format date */
  date?: string;
  races?: number[] | null;
}

export interface RaceEntry {
  /** @format uuid */
  raceEntryId?: string;
  race?: RaceEntryRace | null;
  horse?: RaceEntryHorse | null;
  owner?: RaceEntryPerson | null;
  jockey?: RaceEntryPerson | null;
  trainer?: RaceEntryPerson | null;
  programNumber?: string | null;
  /** @format int32 */
  postPosition?: number | null;
  scratched?: boolean | null;
  lasix?: boolean | null;
}

export interface RaceEntryHorse {
  name?: string | null;
  /** @minLength 1 */
  hisaId: string;
  /** @format int64 */
  referenceNumber?: number | null;
  registry?: string | null;
  sireName?: string | null;
  damName?: string | null;
  sex?: string | null;
  color?: string | null;
  /** @format date */
  foaled?: string | null;
  breedType?: string | null;
}

export interface RaceEntryHorseCreate {
  hisaId?: string | null;
  sex?: string | null;
}

export interface RaceEntryPerson {
  hisaId?: string | null;
  firstName?: string | null;
  middleName?: string | null;
  lastName?: string | null;
  /** @format int64 */
  referenceNumber?: number | null;
  type?: string | null;
  name?: string | null;
}

export interface RaceEntryRace {
  /** @format date */
  date?: string;
  country?: string | null;
  locationId?: string | null;
  locationCode?: string | null;
  locationName?: string | null;
  /** @format int32 */
  raceNumber?: number | null;
  type?: string | null;
  description?: string | null;
  breed?: string | null;
  distance?: string | null;
  /** @format double */
  distanceFurlong?: number | null;
  course?: string | null;
  condition?: string | null;
  /** @format int32 */
  purse?: number | null;
  /** @format date-time */
  postTime?: string | null;
  /** @format date-time */
  offTime?: string | null;
  /** @format int32 */
  claimingPrice?: number | null;
  footnote?: RaceFootnote[] | null;
}

export interface RaceEntryRaceCreate {
  /** @minLength 1 */
  locationId: string;
  /**
   * @format date
   * @minLength 1
   */
  date: string;
  /** @format int32 */
  raceNumber?: number | null;
  type?: string | null;
  description?: string | null;
  breed?: string | null;
  distance: RaceDistance;
  course?: string | null;
  condition?: string | null;
  /** @format int32 */
  purse?: number | null;
  /** @format date-time */
  postTime?: string | null;
  /** @format date-time */
  offTime?: string | null;
  /** @format int32 */
  claimingPrice?: number | null;
  footnote?: RaceFootnote[] | null;
}

export interface RaceEntryResponse {
  /** @format uuid */
  raceEntryId?: string;
  race?: RaceEntryRace | null;
  horse?: RaceEntryHorse | null;
  owner?: RaceEntryPerson | null;
  jockey?: RaceEntryPerson | null;
  trainer?: RaceEntryPerson | null;
  programNumber?: string | null;
  /** @format int32 */
  postPosition?: number | null;
  scratched?: boolean | null;
  lasix?: boolean | null;
}

export interface RaceFootnote {
  /** @format int32 */
  sequence?: number | null;
  note?: string | null;
}

export interface RaceModel {
  numbersOfClaimingRace?: number[] | null;
  /** @format int32 */
  sumOfClaimingRaces?: number;
  /** @format int32 */
  sumOfCompletedRaces?: number;
  numbersOfCompletedRaces?: number[] | null;
}

export interface RacePrice {
  /** @format int32 */
  price?: number;
  priceOptions?: PriceOptions;
}

export interface RaceResultCreateRequest {
  race: RaceEntryRaceCreate;
  horse?: RaceEntryHorseCreate | null;
  owner: RaceEntryPerson;
  jockey?: RaceEntryPerson | null;
  trainer: RaceEntryPerson;
  programNumber?: string | null;
  /** @format int32 */
  postPosition?: number | null;
  /** @format int32 */
  officialPosition?: number | null;
  scratched?: boolean | null;
  /** @format double */
  earnings?: number | null;
  dnf?: boolean | null;
  /** @format int32 */
  shakes?: number | null;
  /** @format float */
  odds?: number | null;
  claimedPriceUsa?: string | null;
  /** @format double */
  claimingPrice?: number | null;
  claimingPriceWaived?: string | null;
  isClaimingWaived?: boolean | null;
  claimIndicator?: string | null;
  isClaimed?: boolean | null;
  voidIndicator?: string | null;
  isClaimingVoided?: boolean | null;
  voidReason?: string | null;
  claimingVoidReason?: VoidReason;
}

export interface RaceResultResponse {
  /** @format uuid */
  raceResultId?: string;
  race?: RaceEntryRace | null;
  horse?: RaceEntryHorse | null;
  owner?: RaceEntryPerson | null;
  jockey?: RaceEntryPerson | null;
  trainer?: RaceEntryPerson | null;
  programNumber?: string | null;
  /** @format int32 */
  postPosition?: number | null;
  /** @format int32 */
  officialPosition?: number | null;
  scratched?: boolean | null;
  /** @format double */
  earnings?: number | null;
  dnf?: boolean | null;
  /** @format int32 */
  shakes?: number | null;
  /** @format float */
  odds?: number | null;
  claimedPriceUsa?: string | null;
  /** @format double */
  claimingPrice?: number | null;
  claimingPriceWaived?: string | null;
  isClaimingWaived?: boolean | null;
  claimIndicator?: string | null;
  isClaimed?: boolean | null;
  voidIndicator?: string | null;
  isClaimingVoided?: boolean | null;
  voidReason?: string | null;
  claimingVoidReason?: VoidReason;
  isAddedManually?: boolean | null;
}

export interface RaceResultSearchDto {
  /** @format uuid */
  raceResultId?: string;
  race?: RaceEntryRace | null;
  horse?: RaceEntryHorse | null;
  owner?: RaceEntryPerson | null;
  jockey?: RaceEntryPerson | null;
  trainer?: RaceEntryPerson | null;
  programNumber?: string | null;
  /** @format int32 */
  postPosition?: number | null;
  /** @format int32 */
  officialPosition?: number | null;
  scratched?: boolean | null;
  /** @format double */
  earnings?: number | null;
  dnf?: boolean | null;
  /** @format int32 */
  shakes?: number | null;
  /** @format float */
  odds?: number | null;
  claimedPriceUsa?: string | null;
  /** @format double */
  claimingPrice?: number | null;
  claimingPriceWaived?: string | null;
  isClaimingWaived?: boolean | null;
  claimIndicator?: string | null;
  isClaimed?: boolean | null;
  voidIndicator?: string | null;
  isClaimingVoided?: boolean | null;
  voidReason?: string | null;
  claimingVoidReason?: VoidReason | null;
  isAddedManually?: boolean | null;
}

export interface RaceViewModel {
  horseId?: string | null;
  horseName?: string | null;
  startingPosition?: string | null;
  isHorseClaimed?: boolean;
  isHorseToClaim?: boolean;
  raceResult?: RaceResultSearchDto | null;
  claimHistoryId?: string | null;
  isHorseVoided?: boolean;
}

export interface RecordActivity {
  lastUpdate?: RecordActivityDetail | null;
  lastAccess?: RecordActivityDetail | null;
  created?: RecordActivityDetail | null;
  deleted?: RecordActivityDetail | null;
}

export interface RecordActivityDetail {
  uuid?: string | null;
  appKey?: string | null;
  traceId?: string | null;
  spanId?: string | null;
  /** @format date-time */
  date?: string;
}

export interface RequestToBecomeRPAcceptCommand {
  /** @minLength 1 */
  hisaHorseId: string;
  /**
   * @format uuid
   * @minLength 1
   */
  sourceCommandId: string;
  /** @minLength 1 */
  newRespPersonId: string;
  /** @minLength 1 */
  toHisaPersonId: string;
}

export interface RequstToBecomeRPCommand {
  /** @minLength 1 */
  hisaHorseId: string;
  /** @minLength 1 */
  newRespPersonId: string;
}

export interface RequstToBecomeRPRejectCommand {
  /** @minLength 1 */
  hisaHorseId: string;
  /** @format uuid */
  sourceCommandId: string;
  /** @minLength 1 */
  newRespPersonId: string;
  /** @minLength 1 */
  toHisaPersonId: string;
}

export interface RscAudit {
  rscAssessment?: Assessment | null;
}

export interface RtrDiscussionResponse {
  participants?: RtrReportHisaEntityModel[] | null;
  messages?: DiscussionMessage[] | null;
}

export interface RtrFailureReasonsUpdateRequest {
  failureReasonCodes?: string[] | null;
}

export interface RtrInspectionResultsResponse {
  /** @format date */
  date?: string;
  passed?: boolean;
  reasonCodes?: string[] | null;
  observationNotes?: string | null;
  regVetComments?: string | null;
}

export interface RtrRaceEntryResponse {
  /** @format date */
  date?: string | null;
  location?: RtrReportHisaEntityModel | null;
}

export interface RtrReportAttendingVetUpdateRequest {
  attendingVetId?: string | null;
}

export interface RtrReportCreateRequest {
  horseId?: string | null;
  locationId?: string | null;
  barnNumber?: string | null;
  isHorseShippedIn?: boolean;
  attendingVetId?: string | null;
  layoffReason?: string | null;
  otherLayoffReason?: string | null;
  intendedRace?: RtrReportRaceEntryUpdateRequest | null;
}

export interface RtrReportCurrentLocationResponse {
  hisaId?: string | null;
  name?: string | null;
  displayName?: string | null;
  barnNumber?: string | null;
  isHorseShippedIn?: boolean;
}

export interface RtrReportHisaEntityModel {
  hisaId?: string | null;
  name?: string | null;
  displayName?: string | null;
}

export interface RtrReportLayoffReasonUpdateRequest {
  layoffReason?: string | null;
  otherLayoffReason?: string | null;
}

export interface RtrReportLocationUpdateRequest {
  locationId?: string | null;
  barnNumber?: string | null;
  isHorseShippedIn?: boolean;
}

export interface RtrReportMedicalSummaryResponse {
  summary?: string | null;
  status?: MedicalSummaryStatus;
}

export interface RtrReportRaceEntryUpdateRequest {
  locationId?: string | null;
  /** @format date */
  date?: string | null;
}

export interface RtrReportResponse {
  reportId?: string | null;
  /** @format date-time */
  createdAt?: string;
  status?: RtrReportStatus;
  statusSetBy?: string | null;
  /** @format date */
  submittedOn?: string | null;
  /** @format date */
  underReviewSince?: string | null;
  /** @format date */
  awaitingReplySince?: string | null;
  /** @format date */
  schedulingSince?: string | null;
  /** @format date */
  dateSetOn?: string | null;
  /** @format date */
  completedOn?: string | null;
  /** @format date */
  failedOn?: string | null;
  /** @format date */
  expiredOn?: string | null;
  type?: RtrReportType;
  author?: RtrReportHisaEntityModel | null;
  horse?: RtrReportHisaEntityModel | null;
  owner?: RtrReportHisaEntityModel | null;
  responsiblePerson?: RtrReportHisaEntityModel | null;
  treatingVet?: RtrReportHisaEntityModel | null;
  reviewingVet?: RtrReportHisaEntityModel | null;
  location?: RtrReportCurrentLocationResponse | null;
  layoffReason?: string | null;
  otherLayoffReason?: string | null;
  rpSubmissionNotes?: string | null;
  attendingVetSubmissionNotes?: string | null;
  approvingResponsiblePersonId?: string | null;
  approvingAttendingVetId?: string | null;
  /** @format date */
  inspectionDate?: string | null;
  workOffResult?: RtrInspectionResultsResponse | null;
  failureReasons?: string[] | null;
  intendedRaceEntry?: RtrRaceEntryResponse | null;
}

export interface RtrReportRpUpdateRequest {
  responsiblePersonId?: string | null;
}

export interface RtrReportSubmissionNotesUpdateRequest {
  submissionNotes?: string | null;
}

export interface RtrReportTypeChangeRequest {
  type?: RtrReportType;
}

export interface RtrWorkOffResultsUpdateRequest {
  /** @format date */
  date?: string;
  passed?: boolean;
  resultCodes?: string[] | null;
  observationNotes?: string | null;
  regVetComments?: string | null;
}

export interface RtrWorkOffScheduleRequest {
  personScheduleId?: string | null;
  /** @format date-time */
  startDateTime?: string;
  /** @format date-time */
  endDateTime?: string;
}

export interface RulingAdjudicatorsHisaId {
  hisaBoard?: string[] | null;
  boardPanel?: string[] | null;
  arbitralPanel?: string[] | null;
  rscMembers?: string[] | null;
  nspMembers?: string[] | null;
  trackStewards?: string[] | null;
}

export interface RulingAmountDue {
  /** @format double */
  amount?: number;
  /** @format date */
  dueDate?: string;
}

export interface RulingBatchUpdate {
  actionCode?: string | null;
  customCode?: string | null;
  locationId?: string | null;
  /** @format date */
  date?: string;
  /** @format date */
  rulingDate?: string | null;
  /** @format date */
  dateEntered?: string | null;
  personsInvolved?: RulingPersonInvolved[] | null;
  horsesInvolved?: RulingHorseInvolved[] | null;
  adjudicatorsHisaId?: RulingAdjudicatorsHisaId | null;
  filesUri?: string[] | null;
  status?: RulingStatus;
  stage?: RulingStage;
  rulingBody?: RulingBody;
  canBeAppealed?: boolean;
  horseId?: string | null;
  raceNumber?: string | null;
  responsiblePersonHisaId?: string | null;
  ownerHisaId?: string | null;
  classification?: string | null;
  /** @format date */
  reportingDate?: string;
  /** @format date */
  lastDayOfAppeal?: string | null;
  invoices?: StripeInvoice[] | null;
  receipts?: StripeReceipt[] | null;
  rulingDetails?: RulingPersonInvolvedDetails | null;
  isDisqualified?: boolean;
  organizationsInvolved?: RulingOrganizationsInvolvedBase[] | null;
  hisaRulingId?: string | null;
}

export interface RulingFine {
  /** @format double */
  amount?: number;
  costRecovery?: RulingAmountDue | null;
  paid?: boolean;
  /** @format double */
  total?: number;
  /** @format double */
  amountPaid?: number;
  /** @format date */
  paymentDue?: string;
  installments?: RulingAmountDue[] | null;
}

export interface RulingHorseInvolved {
  hisaHorseId?: string | null;
  horseName?: string | null;
  suspension?: RulingSuspension | null;
  barredFromRacing?: boolean;
  status?: RulingStatus;
  /** @format date */
  rulingDate?: string | null;
  /** @format date */
  hearingDate?: string | null;
  /** @format date */
  dateEntered?: string | null;
}

export interface RulingOrganizationsInvolved {
  locationId?: string | null;
  suspension?: RulingSuspension | null;
  fine?: RulingFine | null;
  requiredActions?: RulingRequiredActions | null;
  barredFromRacing?: boolean;
  status?: RulingStatus;
  /** @format date */
  rulingDate?: string | null;
  /** @format date */
  hearingDate?: string | null;
  /** @format date */
  dateEntered?: string | null;
  locationName?: string | null;
}

export interface RulingOrganizationsInvolvedBase {
  locationId?: string | null;
  suspension?: RulingSuspension | null;
  fine?: RulingFine | null;
  requiredActions?: RulingRequiredActions | null;
  barredFromRacing?: boolean;
  status?: RulingStatus;
  /** @format date */
  rulingDate?: string | null;
  /** @format date */
  hearingDate?: string | null;
  /** @format date */
  dateEntered?: string | null;
}

export interface RulingPaymentDueRequest {
  rulingIds?: string[] | null;
  /** @format int32 */
  paymentDueInDays?: number | null;
}

export interface RulingPersonFine {
  /** @format double */
  total?: number;
  /** @format double */
  overdue?: number;
  detail?: RulingPersonFineDetail[] | null;
}

export interface RulingPersonFineDetail {
  /** @format double */
  fine?: number;
  /** @format double */
  paid?: number;
  /** @format double */
  balance?: number;
  rulingId?: string | null;
  actionCode?: string | null;
  /** @format date */
  dueDate?: string;
}

export interface RulingPersonInvolved {
  hisaPersonId?: string | null;
  personName?: string | null;
  lastName?: string | null;
  email?: string | null;
  fine?: RulingFine | null;
  suspension?: RulingSuspension | null;
  points?: RulingPoints | null;
  purseForfeiturePercent?: RulingPurseForfeiturePercent | null;
  requiredActions?: RulingRequiredActions | null;
  details?: RulingPersonInvolvedDetails | null;
  status?: RulingStatus;
  statusDisplayName?: string | null;
  /** @format date */
  rulingDate?: string | null;
  /** @format date */
  hearingDate?: string | null;
  /** @format date */
  dateEntered?: string | null;
  barredFromRacing?: boolean;
}

export interface RulingPersonInvolvedDetails {
  regulationNumber?: string | null;
  description?: string | null;
  stewardsRuling?: string | null;
  rscRuling?: string | null;
  nspRuling?: string | null;
  arbitralRuling?: string | null;
  hisaBoardApealRuling?: string | null;
  boardPanelRuling?: string | null;
  hisaBoardRuling?: string | null;
}

export interface RulingPersonPoints {
  /** @format double */
  totalPoints?: number;
  detail?: RulingPersonPointsDetail[] | null;
}

export interface RulingPersonPointsDetail {
  /** @format double */
  points?: number;
  rulingId?: string | null;
  actionCode?: string | null;
  /** @format date */
  expires?: string;
}

export interface RulingPoints {
  /** @format double */
  amount?: number;
  /** @format date */
  expireDate?: string;
  /** @format int32 */
  duration?: number;
}

export interface RulingPurseForfeiturePercent {
  /** @format double */
  amount?: number;
  paid?: boolean;
  disqualified?: boolean;
  withheld?: boolean;
}

export interface RulingRequest {
  actionCode?: string | null;
  customCode?: string | null;
  locationId?: string | null;
  /** @format date */
  date?: string;
  /** @format date */
  rulingDate?: string | null;
  /** @format date */
  dateEntered?: string | null;
  personsInvolved?: RulingPersonInvolved[] | null;
  horsesInvolved?: RulingHorseInvolved[] | null;
  adjudicatorsHisaId?: RulingAdjudicatorsHisaId | null;
  filesUri?: string[] | null;
  status?: RulingStatus;
  stage?: RulingStage;
  rulingBody?: RulingBody;
  canBeAppealed?: boolean;
  horseId?: string | null;
  raceNumber?: string | null;
  responsiblePersonHisaId?: string | null;
  ownerHisaId?: string | null;
  classification?: string | null;
  /** @format date */
  reportingDate?: string;
  /** @format date */
  lastDayOfAppeal?: string | null;
  invoices?: StripeInvoice[] | null;
  receipts?: StripeReceipt[] | null;
  rulingDetails?: RulingPersonInvolvedDetails | null;
  isDisqualified?: boolean;
  organizationsInvolved?: RulingOrganizationsInvolvedBase[] | null;
}

export interface RulingRequiredActions {
  description?: string | null;
  completed?: boolean;
  /** @format date */
  completeByDate?: string;
  /** @format double */
  finePerCalendarDay?: number;
}

export interface RulingResponse {
  actionCode?: string | null;
  customCode?: string | null;
  locationId?: string | null;
  /** @format date */
  date?: string;
  /** @format date */
  rulingDate?: string | null;
  /** @format date */
  dateEntered?: string | null;
  personsInvolved?: RulingPersonInvolved[] | null;
  horsesInvolved?: RulingHorseInvolved[] | null;
  adjudicatorsHisaId?: RulingAdjudicatorsHisaId | null;
  filesUri?: string[] | null;
  status?: RulingStatus;
  stage?: RulingStage;
  rulingBody?: RulingBody;
  canBeAppealed?: boolean;
  horseId?: string | null;
  raceNumber?: string | null;
  responsiblePersonHisaId?: string | null;
  ownerHisaId?: string | null;
  classification?: string | null;
  /** @format date */
  reportingDate?: string;
  /** @format date */
  lastDayOfAppeal?: string | null;
  invoices?: StripeInvoice[] | null;
  receipts?: StripeReceipt[] | null;
  rulingDetails?: RulingPersonInvolvedDetails | null;
  isDisqualified?: boolean;
  organizationsInvolved?: RulingOrganizationsInvolved[] | null;
  hisaRulingId?: string | null;
  stageDescription?: string | null;
  displayRulingId?: string | null;
}

export interface RulingSuspension {
  /** @format date */
  start?: string | null;
  /** @format int32 */
  duration?: number | null;
  dates?: string[] | null;
}

export interface RuntimeFieldHandle {
  value?: IntPtr;
}

export interface RuntimeMethodHandle {
  value?: IntPtr;
}

export interface RuntimeTypeHandle {
  value?: IntPtr;
}

export interface ScratchAdminUpdateRequest {
  /** @minLength 1 */
  scratchId: string;
  locationId?: string | null;
  horseId?: string | null;
  responsiblePersonId?: string | null;
  hisaStewardId?: string | null;
  hisaJockeyId?: string | null;
  /** @format date */
  date?: string | null;
  /**
   * @format time
   * @pattern ([0-9]{2}):(?:[0-9]{2}):([0-9]{2})
   */
  time?: string | null;
  /** @format int32 */
  raceNumber?: number | null;
  /** @format date-time */
  raceTime?: string | null;
  calledInBy?: CalledInType | null;
  calledInByDescription?: string | null;
  nameOfCaller?: string | null;
  notes?: string | null;
  cancelReason?: string | null;
  cancelledByHisaId?: string | null;
  reasonCode?: string | null;
  status?: ScratchStatus | null;
  programNumber?: string | null;
  /** @format int32 */
  postPosition?: number | null;
  updatedByHisaId?: string | null;
}

export interface ScratchBulkPostBaseRequest {
  scratchIds: string[] | null;
}

export interface ScratchBulkPostRequest {
  scratchIds: string[] | null;
  /** @minLength 1 */
  postedByHisaPersonId: string;
}

export interface ScratchBulkPostResponse {
  isSuccsess?: boolean;
  message?: string | null;
  postedScratches?: ScratchResponse[] | null;
  failedScratches?: FailedScratchInfo[] | null;
}

export interface ScratchCancelBaseRequest {
  /** @minLength 1 */
  locationId: string;
  /**
   * @format date
   * @minLength 1
   */
  date: string;
  /** @format int32 */
  raceNumber: number;
  /** @minLength 1 */
  cancelReason: string;
}

export interface ScratchCancelRequest {
  /** @minLength 1 */
  locationId: string;
  /**
   * @format date
   * @minLength 1
   */
  date: string;
  /** @format int32 */
  raceNumber: number;
  /** @minLength 1 */
  cancelReason: string;
  /** @minLength 1 */
  canceledByHisaPersonId: string;
}

export interface ScratchCreateRequest {
  /** @minLength 1 */
  locationId: string;
  /** @minLength 1 */
  horseId: string;
  /** @minLength 1 */
  responsiblePersonId: string;
  /** @minLength 1 */
  hisaStewardId: string;
  /** @minLength 1 */
  hisaJockeyId: string;
  /**
   * @format date
   * @minLength 1
   */
  date: string;
  /**
   * @format time
   * @minLength 1
   * @pattern ([0-9]{2}):(?:[0-9]{2}):([0-9]{2})
   */
  time: string;
  /**
   * @format int32
   * @min 0
   */
  raceNumber: number;
  /**
   * @format date-time
   * @minLength 1
   */
  raceTime: string;
  calledInBy?: CalledInType;
  calledInByDescription?: string | null;
  nameOfCaller?: string | null;
  programNumber?: string | null;
  /** @format int32 */
  postPosition?: number;
  notes?: string | null;
  /** @minLength 1 */
  reasonCode: string;
}

export interface ScratchDeadlineResponse {
  /** @format int32 */
  scratchDeadlineId: number;
  locationId: string | null;
  /** @format date */
  date: string;
  /**
   * @format time
   * @pattern ([0-9]{2}):(?:[0-9]{2}):([0-9]{2})
   */
  time: string;
}

export interface ScratchDeadlineUpsertRequest {
  locationId?: string | null;
  /** @format date */
  date?: string;
  /**
   * @format time
   * @pattern ([0-9]{2}):(?:[0-9]{2}):([0-9]{2})
   */
  deadlineTime?: string;
}

export interface ScratchHisaEntityModel {
  hisaId?: string | null;
  name?: string | null;
  displayName?: string | null;
}

export interface ScratchReasonModel {
  code?: string | null;
  name?: string | null;
  attributableTo?: string | null;
  reportedAs?: string | null;
}

export interface ScratchReasonsResponse {
  calledInBy?: string | null;
  reasons?: ScratchReasonModel[] | null;
}

export interface ScratchResponse {
  scratchId?: string | null;
  location?: ScratchHisaEntityModel | null;
  horse?: ScratchHisaEntityModel | null;
  steward?: ScratchHisaEntityModel | null;
  jockey?: ScratchHisaEntityModel | null;
  responsiblePerson?: ScratchHisaEntityModel | null;
  reason?: string | null;
  reasonCode?: string | null;
  /** @format date */
  date?: string;
  /**
   * @format time
   * @pattern ([0-9]{2}):(?:[0-9]{2}):([0-9]{2})
   */
  time?: string;
  /** @format int32 */
  raceNumber?: number;
  /** @format date-time */
  raceTime?: string;
  /** @format date-time */
  postedAt?: string | null;
  /** @format date-time */
  cancelledAt?: string | null;
  calledInBy?: CalledInType;
  calledInByDescription?: string | null;
  nameOfCaller?: string | null;
  notes?: string | null;
  status?: ScratchStatus;
  type?: ScratchType;
  programNumber?: string | null;
  /** @format int32 */
  actualPostPosition?: number;
  /** @format int32 */
  postPosition?: number;
  cancelReason?: string | null;
  cancelledByHisaId?: string | null;
  cancelledByHisaPersonName?: string | null;
  /** @format date-time */
  createdDateTime?: string | null;
  createdByHisaId?: string | null;
  /** @format date-time */
  lastUpdatedDateTime?: string | null;
  updatedByHisaId?: string | null;
}

export interface ScratchSearchQuery {
  /** @format int32 */
  page?: number;
  /** @format int32 */
  pageSize?: number;
  sortBy?: string | null;
  /** @format int32 */
  sortDirection?: number;
  isAscSort?: boolean;
  /** @format date-time */
  startDate?: string | null;
  /** @format date-time */
  endDate?: string | null;
  searchText?: string | null;
  includeDeleted?: boolean | null;
  scratchIds?: string[] | null;
  locationIds?: string[] | null;
  horseIds?: string[] | null;
  hisaStewardIds?: string[] | null;
  hisaJockeyIds?: string[] | null;
  responsiblePersonIds?: string[] | null;
  raceNumbers?: number[] | null;
  statuses?: ScratchStatus[] | null;
  calledInBy?: CalledInType[] | null;
  scratchReasonCodes?: string[] | null;
  type?: ScratchType | null;
  /** @format date-time */
  raceStartDate?: string | null;
  /** @format date-time */
  raceEndDate?: string | null;
  /** @format date-time */
  postedAtStartDate?: string | null;
  /** @format date-time */
  postedAtEndDate?: string | null;
}

export interface ScratchUpdateRequest {
  /** @minLength 1 */
  scratchId: string;
  hisaStewardId?: string | null;
  hisaJockeyId?: string | null;
  responsiblePersonId?: string | null;
  reasonCode?: string | null;
  nameOfCaller?: string | null;
  calledInBy?: CalledInType | null;
  calledInByDescription?: string | null;
  /** @format date-time */
  raceTime?: string | null;
  /** @format date */
  date?: string | null;
  /**
   * @format time
   * @pattern ([0-9]{2}):(?:[0-9]{2}):([0-9]{2})
   */
  time?: string | null;
  programNumber?: string | null;
  /** @format int32 */
  postPosition?: number | null;
  notes?: string | null;
}

export interface SearchResponseRtrReportResponse {
  documents?: RtrReportResponse[] | null;
  pagination?: PaginationResponse | null;
}

export interface SecureMailSearchRequest {
  /** @format int32 */
  page?: number;
  /** @format int32 */
  pageSize?: number;
  sortBy?: string | null;
  /** @format int32 */
  sortDirection?: number;
  isAscSort?: boolean;
  showDeleted?: boolean;
  search?: MailSearchModel[] | null;
}

export interface SortExpression {
  fieldName?: SortType;
  isAscending?: boolean;
}

export interface StateLicenseId {
  license?: string | null;
  state?: string | null;
  locationId?: string | null;
  url?: string | null;
}

export interface StripeInvoice {
  name?: string | null;
  /** @format date-time */
  date?: string;
  id?: string | null;
  sessionId?: string | null;
}

export interface StripeReceipt {
  name?: string | null;
  /** @format date-time */
  date?: string;
  id?: string | null;
}

export interface StructLayoutAttribute {
  typeId?: any;
  value?: LayoutKind;
}

export interface SystemSetting {
  systemSettingId?: string | null;
  stringValue?: string | null;
  stringList?: string[] | null;
  uuid?: string | null;
  activity?: RecordActivity | null;
}

export interface Task {
  /** @format int32 */
  id?: number;
  exception?: AggregateException | null;
  status?: TaskStatus;
  isCanceled?: boolean;
  isCompleted?: boolean;
  isCompletedSuccessfully?: boolean;
  creationOptions?: TaskCreationOptions;
  asyncState?: any;
  isFaulted?: boolean;
}

export interface TestOrderInvoice {
  invoiceNumber?: string | null;
  /** @format date */
  dateOfIssue?: string;
  /** @format date */
  dateDue?: string;
  hisaPerson?: string | null;
  hiwuTestOrderNumber?: string | null;
  hiwuAddres1?: string | null;
  hiwuAddres2?: string | null;
  hiwuAddres3?: string | null;
  hiwuAddres4?: string | null;
  billToName?: string | null;
  billToEmail?: string | null;
  /** @format double */
  amount?: number;
  linkToPayOnline?: string | null;
  description?: string | null;
  /** @format int32 */
  quantity?: number;
  /** @format double */
  unitPrice?: number;
  hiwuEmail?: string | null;
  hisaEmail?: string | null;
}

export interface TimeOnlyRange {
  /**
   * @format time
   * @pattern ([0-9]{2}):(?:[0-9]{2}):([0-9]{2})
   */
  startTime?: string | null;
  /**
   * @format time
   * @pattern ([0-9]{2}):(?:[0-9]{2}):([0-9]{2})
   */
  endTime?: string | null;
}

export interface TjcClaimHistoryResponse {
  /** @format uuid */
  claimHistoryId?: string;
  hisaHorseId?: string | null;
  locationId?: string | null;
  hisaHorseName?: string | null;
  /** @format date */
  claimDate?: string | null;
  /** @format date-time */
  createdDateTime?: string;
  /** @format double */
  claimingPrice?: number;
  /** @format int32 */
  shakes?: number;
  newOwnerId?: string | null;
  newTrainerId?: string | null;
  previousOwnerId?: string | null;
  previousTrainerId?: string | null;
  isVoided?: boolean;
  reason?: string | null;
  claimHistoryHisaId?: string | null;
  /** @format int32 */
  raceNumber?: number | null;
}

export interface TjcDetailsResponse {
  tjcUpdateStatus?: TjcTjcUpdateStatus;
  tjcUpdateDetails?: string | null;
}

export interface TjcTjcActivity {
  lastTrackId?: string | null;
  lastCountry?: string | null;
  /** @format date-time */
  lastRaceDate?: string | null;
  additionalProperties?: Record<string, any>;
}

export interface TjcTjcFootnote {
  /** @format int32 */
  sequence?: number | null;
  note?: string | null;
  additionalProperties?: Record<string, any>;
}

export interface TjcTjcHorse {
  name?: string | null;
  hisaId?: string | null;
  /** @format int64 */
  referenceNumber?: number | null;
  registry?: string | null;
  tattoo?: string | null;
  sireName?: string | null;
  damName?: string | null;
  sex?: string | null;
  color?: string | null;
  identification?: TjcTjcHorseIdentification | null;
  microchips?: TjcTjcHorseMicrochip[] | null;
  /** @format date-time */
  foaled?: string | null;
  breedType?: string | null;
  additionalProperties?: Record<string, any>;
}

export interface TjcTjcHorseActivities {
  raceLast?: TjcTjcRace | null;
  raceNext?: TjcTjcRace | null;
  workoutLast?: TjcTjcWorkout | null;
  hisaId?: string | null;
  additionalProperties?: Record<string, any>;
}

export interface TjcTjcHorseIdentification {
  markings?: TjcTjcHorseMarking[] | null;
  microchips?: TjcTjcHorseMicrochip[] | null;
  additionalProperties?: Record<string, any>;
}

export interface TjcTjcHorseMarking {
  partId?: string | null;
  partName?: string | null;
  /** @format int32 */
  sequence?: number | null;
  text1?: string | null;
  text2?: string | null;
  additionalProperties?: Record<string, any>;
}

export interface TjcTjcHorseMicrochip {
  chipNumber?: string | null;
  system?: string | null;
  systemDescription?: string | null;
  type?: string | null;
  typeDescription?: string | null;
  /** @format date-time */
  date?: string | null;
  additionalProperties?: Record<string, any>;
}

export interface TjcTjcIdModel {
  /**
   * @format int32
   * @min 0
   * @exclusiveMin true
   */
  referenceNumber?: number;
  /** @minLength 1 */
  registry: string;
}

export interface TjcTjcPerson {
  firstName?: string | null;
  middleName?: string | null;
  lastName?: string | null;
  hisaId?: string | null;
  /** @format int64 */
  referenceNumber?: number | null;
  type?: string | null;
  activity?: TjcTjcActivity | null;
  additionalProperties?: Record<string, any>;
}

export interface TjcTjcRace {
  trackId?: string | null;
  country?: string | null;
  /** @format date-time */
  date?: string | null;
  /** @format int32 */
  raceNumber?: number | null;
  trackName?: string | null;
  breed?: string | null;
  type?: string | null;
  description?: string | null;
  distance?: string | null;
  course?: string | null;
  condition?: string | null;
  /** @format int32 */
  purse?: number | null;
  /** @format date-time */
  postTime?: string | null;
  /** @format date-time */
  offTime?: string | null;
  /** @format int32 */
  claimingPrice?: number | null;
  footnote?: TjcTjcFootnote[] | null;
  additionalProperties?: Record<string, any>;
}

export interface TjcTjcWorkout {
  trackId?: string | null;
  country?: string | null;
  /** @format date-time */
  date?: string | null;
  trackName?: string | null;
  distance?: string | null;
  course?: string | null;
  condition?: string | null;
  type?: string | null;
  /** @format int32 */
  rank?: number | null;
  /** @format double */
  timing?: number | null;
  additionalProperties?: Record<string, any>;
}

export interface TrackMeetReportCreateRequest {
  locationId?: string | null;
  locationName?: string | null;
  /** @format date */
  firstDayOfRace?: string;
  /** @format date */
  lastDayOfRace?: string;
  isSubmitted?: boolean | null;
  /** @format int32 */
  numberOfRaceDays?: number | null;
  /** @format int32 */
  numberOfRaces?: number | null;
  /** @format int32 */
  numberOfHorses?: number | null;
  meetStatisticModel?: MeetStatisticModel | null;
  generalQuestion?: GeneralQuestionModel[] | null;
  optionalQuestion?: OptionalQuestionModel[] | null;
}

export interface TrackMeetReportResponse {
  /** @format date */
  firstDayOfRace?: string;
  /** @format date */
  lastDayOfRace?: string;
  /** @format int32 */
  numberOfRaceDays?: number | null;
  /** @format int32 */
  numberOfRaces?: number | null;
  /** @format int32 */
  numberOfHorses?: number | null;
  meetStatisticModel?: MeetStatisticModel | null;
  generalQuestion?: GeneralQuestionModel[] | null;
  optionalQuestion?: OptionalQuestionModel[] | null;
  reportId?: string | null;
  locationId?: string | null;
  locationName?: string | null;
  isSubmitted?: boolean | null;
}

export interface TrackMeetReportUpdateRequest {
  /** @format date */
  firstDayOfRace?: string;
  /** @format date */
  lastDayOfRace?: string;
  /** @format int32 */
  numberOfRaceDays?: number | null;
  /** @format int32 */
  numberOfRaces?: number | null;
  /** @format int32 */
  numberOfHorses?: number | null;
  meetStatisticModel?: MeetStatisticModel | null;
  generalQuestion?: GeneralQuestionModel[] | null;
  optionalQuestion?: OptionalQuestionModel[] | null;
}

export interface TrackResponse {
  fileAttachments?: FileAttachment[] | null;
  /** @format date-time */
  dateTime?: string;
  personCommentary?: string | null;
  personId?: string | null;
  trackResponseAssessment?: TrackResponseAssessment | null;
}

export interface TraitModel {
  name?: string | null;
  /** @format double */
  score?: number;
}

export interface TreatmentProtocolCreateRequest {
  personId?: string | null;
  protocolName?: string | null;
  treatments?: TreatmentTemplateRequest[] | null;
  isPublic?: boolean;
  /** @format date-time */
  createdDateTime?: string | null;
  /** @format date-time */
  lastUpdatedDateTime?: string | null;
}

export interface TreatmentProtocolResponse {
  treatmentProtocolId?: string | null;
  personId?: string | null;
  protocolName?: string | null;
  treatments?: TreatmentTemplateModel[] | null;
  isPublic?: boolean;
  /** @format date-time */
  createdDateTime?: string | null;
  /** @format date-time */
  lastUpdatedDateTime?: string | null;
}

export interface TreatmentProtocolUpdateRequest {
  protocolId?: string | null;
  protocolName?: string | null;
}

export interface TreatmentProtocolVisibilityRequest {
  protocolId?: string | null;
  isPublic?: boolean;
}

export interface TreatmentTemplateCreateRequest {
  clearedToWork?: boolean;
  clearedToRace?: boolean;
  recType?: HorseMedicalRecType | null;
  vaccine?: string | null;
  drugName?: string | null;
  drugRoute?: HorseMedicalRouteAdmin;
  drugDosage?: string | null;
  procedure?: string | null;
  surgery?: string | null;
  dental?: string | null;
  physiotherapy?: string | null;
  chiropractic?: string | null;
  conditionTreated?: string | null;
  modality?: string | null;
  testName?: string | null;
  testResults?: string | null;
  limbTreated?: string | null;
  notes?: string | null;
  structure?: string | null;
  description?: string | null;
  classifiedAs?: string | null;
  category?: string | null;
  internalNotes?: string | null;
  treatmentProtocolId?: string | null;
}

export interface TreatmentTemplateModel {
  treatmentTemplateId?: string | null;
  treatmentProtocolId?: string | null;
  clearedToWork?: boolean;
  clearedToRace?: boolean;
  recType?: HorseMedicalRecType | null;
  vaccine?: string | null;
  drugName?: string | null;
  drugRoute?: HorseMedicalRouteAdmin;
  drugDosage?: string | null;
  procedure?: string | null;
  surgery?: string | null;
  dental?: string | null;
  physiotherapy?: string | null;
  chiropractic?: string | null;
  conditionTreated?: string | null;
  modality?: string | null;
  testName?: string | null;
  testResults?: string | null;
  limbTreated?: string | null;
  notes?: string | null;
  structure?: string | null;
  description?: string | null;
  classifiedAs?: string | null;
  category?: string | null;
  internalNotes?: string | null;
}

export interface TreatmentTemplateRequest {
  clearedToWork?: boolean;
  clearedToRace?: boolean;
  recType?: HorseMedicalRecType | null;
  vaccine?: string | null;
  drugName?: string | null;
  drugRoute?: HorseMedicalRouteAdmin;
  drugDosage?: string | null;
  procedure?: string | null;
  surgery?: string | null;
  dental?: string | null;
  physiotherapy?: string | null;
  chiropractic?: string | null;
  conditionTreated?: string | null;
  modality?: string | null;
  testName?: string | null;
  testResults?: string | null;
  limbTreated?: string | null;
  notes?: string | null;
  structure?: string | null;
  description?: string | null;
  classifiedAs?: string | null;
  category?: string | null;
  internalNotes?: string | null;
}

export interface TreatmentTemplateResponse {
  treatmentTemplateId?: string | null;
  treatmentProtocolId?: string | null;
  clearedToWork?: boolean;
  clearedToRace?: boolean;
  recType?: HorseMedicalRecType | null;
  vaccine?: string | null;
  drugName?: string | null;
  drugRoute?: HorseMedicalRouteAdmin;
  drugDosage?: string | null;
  procedure?: string | null;
  surgery?: string | null;
  dental?: string | null;
  physiotherapy?: string | null;
  chiropractic?: string | null;
  conditionTreated?: string | null;
  modality?: string | null;
  testName?: string | null;
  testResults?: string | null;
  limbTreated?: string | null;
  notes?: string | null;
  structure?: string | null;
  description?: string | null;
  classifiedAs?: string | null;
  category?: string | null;
  internalNotes?: string | null;
}

export interface TreatmentTemplateUpdateRequest {
  treatmentTemplateId?: string | null;
  treatmentProtocolId?: string | null;
  clearedToWork?: boolean;
  clearedToRace?: boolean;
  recType?: HorseMedicalRecType | null;
  vaccine?: string | null;
  drugName?: string | null;
  drugRoute?: HorseMedicalRouteAdmin;
  drugDosage?: string | null;
  procedure?: string | null;
  surgery?: string | null;
  dental?: string | null;
  physiotherapy?: string | null;
  chiropractic?: string | null;
  conditionTreated?: string | null;
  modality?: string | null;
  testName?: string | null;
  testResults?: string | null;
  limbTreated?: string | null;
  notes?: string | null;
  structure?: string | null;
  description?: string | null;
  classifiedAs?: string | null;
  category?: string | null;
  internalNotes?: string | null;
}

export interface Type {
  name?: string | null;
  customAttributes?: CustomAttributeData[] | null;
  isCollectible?: boolean;
  /** @format int32 */
  metadataToken?: number;
  isInterface?: boolean;
  memberType?: MemberTypes;
  namespace?: string | null;
  assemblyQualifiedName?: string | null;
  fullName?: string | null;
  assembly?: Assembly | null;
  module?: Module | null;
  isNested?: boolean;
  declaringType?: Type | null;
  declaringMethod?: MethodBase | null;
  reflectedType?: Type | null;
  underlyingSystemType?: Type | null;
  isTypeDefinition?: boolean;
  isArray?: boolean;
  isByRef?: boolean;
  isPointer?: boolean;
  isConstructedGenericType?: boolean;
  isGenericParameter?: boolean;
  isGenericTypeParameter?: boolean;
  isGenericMethodParameter?: boolean;
  isGenericType?: boolean;
  isGenericTypeDefinition?: boolean;
  isSZArray?: boolean;
  isVariableBoundArray?: boolean;
  isByRefLike?: boolean;
  isFunctionPointer?: boolean;
  isUnmanagedFunctionPointer?: boolean;
  hasElementType?: boolean;
  genericTypeArguments?: Type[] | null;
  /** @format int32 */
  genericParameterPosition?: number;
  genericParameterAttributes?: GenericParameterAttributes;
  attributes?: TypeAttributes;
  isAbstract?: boolean;
  isImport?: boolean;
  isSealed?: boolean;
  isSpecialName?: boolean;
  isClass?: boolean;
  isNestedAssembly?: boolean;
  isNestedFamANDAssem?: boolean;
  isNestedFamily?: boolean;
  isNestedFamORAssem?: boolean;
  isNestedPrivate?: boolean;
  isNestedPublic?: boolean;
  isNotPublic?: boolean;
  isPublic?: boolean;
  isAutoLayout?: boolean;
  isExplicitLayout?: boolean;
  isLayoutSequential?: boolean;
  isAnsiClass?: boolean;
  isAutoClass?: boolean;
  isUnicodeClass?: boolean;
  isCOMObject?: boolean;
  isContextful?: boolean;
  isEnum?: boolean;
  isMarshalByRef?: boolean;
  isPrimitive?: boolean;
  isValueType?: boolean;
  isSignatureType?: boolean;
  isSecurityCritical?: boolean;
  isSecuritySafeCritical?: boolean;
  isSecurityTransparent?: boolean;
  structLayoutAttribute?: StructLayoutAttribute | null;
  typeInitializer?: ConstructorInfo | null;
  typeHandle?: RuntimeTypeHandle;
  /** @format uuid */
  guid?: string;
  baseType?: Type | null;
  /** @deprecated */
  isSerializable?: boolean;
  containsGenericParameters?: boolean;
  isVisible?: boolean;
}

export interface TypeForNotificationDistribution {
  type?: GroupofNotificationDistribution;
  name?: string | null;
}

export interface TypeInfo {
  name?: string | null;
  customAttributes?: CustomAttributeData[] | null;
  isCollectible?: boolean;
  /** @format int32 */
  metadataToken?: number;
  isInterface?: boolean;
  memberType?: MemberTypes;
  namespace?: string | null;
  assemblyQualifiedName?: string | null;
  fullName?: string | null;
  assembly?: Assembly | null;
  module?: Module | null;
  isNested?: boolean;
  declaringType?: Type | null;
  declaringMethod?: MethodBase | null;
  reflectedType?: Type | null;
  underlyingSystemType?: Type | null;
  isTypeDefinition?: boolean;
  isArray?: boolean;
  isByRef?: boolean;
  isPointer?: boolean;
  isConstructedGenericType?: boolean;
  isGenericParameter?: boolean;
  isGenericTypeParameter?: boolean;
  isGenericMethodParameter?: boolean;
  isGenericType?: boolean;
  isGenericTypeDefinition?: boolean;
  isSZArray?: boolean;
  isVariableBoundArray?: boolean;
  isByRefLike?: boolean;
  isFunctionPointer?: boolean;
  isUnmanagedFunctionPointer?: boolean;
  hasElementType?: boolean;
  genericTypeArguments?: Type[] | null;
  /** @format int32 */
  genericParameterPosition?: number;
  genericParameterAttributes?: GenericParameterAttributes;
  attributes?: TypeAttributes;
  isAbstract?: boolean;
  isImport?: boolean;
  isSealed?: boolean;
  isSpecialName?: boolean;
  isClass?: boolean;
  isNestedAssembly?: boolean;
  isNestedFamANDAssem?: boolean;
  isNestedFamily?: boolean;
  isNestedFamORAssem?: boolean;
  isNestedPrivate?: boolean;
  isNestedPublic?: boolean;
  isNotPublic?: boolean;
  isPublic?: boolean;
  isAutoLayout?: boolean;
  isExplicitLayout?: boolean;
  isLayoutSequential?: boolean;
  isAnsiClass?: boolean;
  isAutoClass?: boolean;
  isUnicodeClass?: boolean;
  isCOMObject?: boolean;
  isContextful?: boolean;
  isEnum?: boolean;
  isMarshalByRef?: boolean;
  isPrimitive?: boolean;
  isValueType?: boolean;
  isSignatureType?: boolean;
  isSecurityCritical?: boolean;
  isSecuritySafeCritical?: boolean;
  isSecurityTransparent?: boolean;
  structLayoutAttribute?: StructLayoutAttribute | null;
  typeInitializer?: ConstructorInfo | null;
  typeHandle?: RuntimeTypeHandle;
  /** @format uuid */
  guid?: string;
  baseType?: Type | null;
  /** @deprecated */
  isSerializable?: boolean;
  containsGenericParameters?: boolean;
  isVisible?: boolean;
  genericTypeParameters?: Type[] | null;
  declaredConstructors?: ConstructorInfo[] | null;
  declaredEvents?: EventInfo[] | null;
  declaredFields?: FieldInfo[] | null;
  declaredMembers?: MemberInfo[] | null;
  declaredMethods?: MethodInfo[] | null;
  declaredNestedTypes?: TypeInfo[] | null;
  declaredProperties?: PropertyInfo[] | null;
  implementedInterfaces?: Type[] | null;
}

export interface UserSettingsResponse {
  appId: string | null;
  userId: string | null;
  settingName: string | null;
  value?: string | null;
}

export interface VaccineCardItemModel {
  name?: string | null;
  /** @format date */
  administeredDate?: string | null;
  /** @format date */
  expiry?: string | null;
  sourceMedicalId?: string | null;
}

export interface VaccineCardModel {
  horseId?: string | null;
  isValid?: boolean;
  errors?: string | null;
  vaccinesOrTests?: VaccineCardItemModel[] | null;
}

export interface VetsListBatchUpdateRequest {
  /** @minLength 1 */
  hisaHorseId: string;
  /** @minLength 1 */
  locationId: string;
  regulatoryVetId?: string | null;
  requiredDiagnostic?: string | null;
  /** @format date */
  requiredDiagnosticCompleteDate?: string | null;
  reason?: VetsListReason;
  /**
   * @format date
   * @minLength 1
   */
  datePlacedOnList: string;
  /** @format date */
  dateToComeOffList?: string | null;
  /** @format date */
  jogPastDate?: string | null;
  /** @format date */
  workoutPastDate?: string | null;
  /** @format date */
  eligibleToWork?: string | null;
  restrictWorks?: boolean;
  restrictedBy?: string | null;
  restrictedReason?: string | null;
  currentResponsiblePersonId?: string | null;
  currentDesignatedOwner?: string | null;
  currentAttendingVet?: string | null;
  /** @format int32 */
  tjcId?: number | null;
  otherStateReason?: string | null;
  sourceHorseMedicalId?: string | null;
  sourceHisaInjuryId?: string | null;
  notes?: string | null;
  qcStatus?: VetsListQcStatus;
  /** @uniqueItems true */
  relatedHorseMedicalIds?: string[] | null;
  vetsInternalNotes?: string | null;
  extensions?: VetsListStayExtension[] | null;
  /** @format int32 */
  daysOnList?: number;
  /** @format date */
  releaseDate?: string | null;
  isRegVetClearRequired?: boolean;
  vetsListId?: string | null;
}

export interface VetsListDurationModel {
  /** @format date */
  releaseDate?: string | null;
  /** @format date */
  eligibleToWork?: string | null;
  /** @format date */
  dateToComeOffList?: string | null;
  /** @format int32 */
  daysOnListToWorkout?: number | null;
  /** @format int32 */
  daysOnList?: number;
  /** @format int32 */
  daysOnWorkout?: number;
  /** @format int32 */
  reasonInstanceCount?: number;
  isBarredFromRacing?: boolean;
  isRegVetClearRequired?: boolean;
  isRegVetClearRequiredForWork?: boolean;
}

export interface VetsListExtendedFilterQuery {
  /** @format int32 */
  page?: number;
  /** @format int32 */
  pageSize?: number;
  sortBy?: string | null;
  /** @format int32 */
  sortDirection?: number;
  isAscSort?: boolean;
  /** @format date-time */
  startDate?: string | null;
  /** @format date-time */
  endDate?: string | null;
  searchText?: string | null;
  includeDeleted?: boolean;
  isEnforced?: boolean | null;
  isRegVetClearRequired?: boolean | null;
  releaseDateRange?: DateRange | null;
  dateToComeOffListDateRange?: DateRange | null;
  datePlacedOnListDateRange?: DateRange | null;
  personIds?: string[] | null;
  horseIds?: string[] | null;
  locationIds?: string[] | null;
  horseMedicalIds?: string[] | null;
  tjcIds?: number[] | null;
  reasons?: VetsListReason[] | null;
}

export interface VetsListHorseSearchRequest {
  /** @minLength 1 */
  hisaHorseId: string;
  /** @format date-time */
  startDate?: string | null;
  /** @format date-time */
  endDate?: string | null;
}

export interface VetsListPatchRequest {
  hisaHorseId?: string | null;
  locationId?: string | null;
  regulatoryVetId?: string | null;
  requiredDiagnostic?: string | null;
  /** @format date */
  requiredDiagnosticCompleteDate?: string | null;
  reason?: VetsListReason | null;
  /** @format date */
  datePlacedOnList?: string | null;
  /** @format date */
  dateToComeOffList?: string | null;
  /** @format date */
  jogPastDate?: string | null;
  /** @format date */
  workoutPastDate?: string | null;
  /** @format date */
  eligibleToWork?: string | null;
  restrictWorks?: boolean | null;
  restrictedBy?: string | null;
  restrictedReason?: string | null;
  currentResponsiblePersonId?: string | null;
  currentDesignatedOwner?: string | null;
  currentAttendingVet?: string | null;
  /** @format int32 */
  tjcId?: number | null;
  otherStateReason?: string | null;
  sourceHorseMedicalId?: string | null;
  sourceHisaInjuryId?: string | null;
  notes?: string | null;
  qcStatus?: VetsListQcStatus | null;
  /** @uniqueItems true */
  relatedHorseMedicalIds?: string[] | null;
  vetsInternalNotes?: string | null;
  extensions?: VetsListStayExtension[] | null;
  /** @format int32 */
  daysOnList?: number | null;
  /** @format date */
  releaseDate?: string | null;
  isRegVetClearRequired?: boolean | null;
}

export interface VetsListPutRequest {
  /** @minLength 1 */
  hisaHorseId: string;
  /** @minLength 1 */
  locationId: string;
  regulatoryVetId?: string | null;
  requiredDiagnostic?: string | null;
  /** @format date */
  requiredDiagnosticCompleteDate?: string | null;
  reason?: VetsListReason;
  /**
   * @format date
   * @minLength 1
   */
  datePlacedOnList: string;
  /** @format date */
  dateToComeOffList?: string | null;
  /** @format date */
  jogPastDate?: string | null;
  /** @format date */
  workoutPastDate?: string | null;
  /** @format date */
  eligibleToWork?: string | null;
  restrictWorks?: boolean;
  restrictedBy?: string | null;
  restrictedReason?: string | null;
  currentResponsiblePersonId?: string | null;
  currentDesignatedOwner?: string | null;
  currentAttendingVet?: string | null;
  /** @format int32 */
  tjcId?: number | null;
  otherStateReason?: string | null;
  sourceHorseMedicalId?: string | null;
  sourceHisaInjuryId?: string | null;
  notes?: string | null;
  qcStatus?: VetsListQcStatus;
  /** @uniqueItems true */
  relatedHorseMedicalIds?: string[] | null;
  vetsInternalNotes?: string | null;
  extensions?: VetsListStayExtension[] | null;
  /** @format int32 */
  daysOnList?: number;
  /** @format date */
  releaseDate?: string | null;
  isRegVetClearRequired?: boolean;
}

export interface VetsListRequest {
  /** @minLength 1 */
  hisaHorseId: string;
  /** @minLength 1 */
  locationId: string;
  regulatoryVetId?: string | null;
  requiredDiagnostic?: string | null;
  /** @format date */
  requiredDiagnosticCompleteDate?: string | null;
  reason?: VetsListReason;
  /**
   * @format date
   * @minLength 1
   */
  datePlacedOnList: string;
  /** @format date */
  dateToComeOffList?: string | null;
  /** @format date */
  jogPastDate?: string | null;
  /** @format date */
  workoutPastDate?: string | null;
  /** @format date */
  eligibleToWork?: string | null;
  restrictWorks?: boolean;
  restrictedBy?: string | null;
  restrictedReason?: string | null;
  currentResponsiblePersonId?: string | null;
  currentDesignatedOwner?: string | null;
  currentAttendingVet?: string | null;
  /** @format int32 */
  tjcId?: number | null;
  otherStateReason?: string | null;
  sourceHorseMedicalId?: string | null;
  sourceHisaInjuryId?: string | null;
  notes?: string | null;
  qcStatus?: VetsListQcStatus;
  /** @uniqueItems true */
  relatedHorseMedicalIds?: string[] | null;
  vetsInternalNotes?: string | null;
  extensions?: VetsListStayExtension[] | null;
}

export interface VetsListResponse {
  hisaHorseId?: string | null;
  locationId?: string | null;
  regulatoryVetId?: string | null;
  requiredDiagnostic?: string | null;
  /** @format date */
  requiredDiagnosticCompleteDate?: string | null;
  reason?: VetsListReason;
  /** @format date */
  datePlacedOnList?: string;
  /** @format date */
  jogPastDate?: string | null;
  /** @format date */
  workoutPastDate?: string | null;
  /** @format date */
  eligibleToWork?: string | null;
  restrictWorks?: boolean;
  restrictedBy?: string | null;
  restrictedReason?: string | null;
  currentResponsiblePersonId?: string | null;
  currentDesignatedOwner?: string | null;
  currentAttendingVet?: string | null;
  /** @format int32 */
  tjcId?: number | null;
  otherStateReason?: string | null;
  sourceHorseMedicalId?: string | null;
  sourceHisaInjuryId?: string | null;
  notes?: string | null;
  qcStatus?: VetsListQcStatus;
  /** @uniqueItems true */
  relatedHorseMedicalIds?: string[] | null;
  vetsInternalNotes?: string | null;
  extensions?: VetsListStayExtension[] | null;
  vetsListId?: string | null;
  /** @format int32 */
  daysOnList?: number;
  isRegVetClearRequired?: boolean;
  /** @format date */
  releaseDate?: string | null;
  /** @format date */
  dateToComeOffList?: string | null;
  isEnforced?: boolean;
  isDeleted?: boolean;
  locationName?: string | null;
  hisaHorseName?: string | null;
  currentResponsiblePersonName?: string | null;
  currentDesignatedOwnerName?: string | null;
  currentAttendingVetName?: string | null;
}

export interface VetsListStayExtension {
  /** @format date */
  extensionOn?: string;
  /** @format int32 */
  days?: number;
}

export interface WaiverRequestDto {
  hisaHorseId?: string | null;
  isLastRaceMoreThanHundredTwentyDays?: boolean;
  isClaimingRace?: boolean;
  racePrice?: RacePrice | null;
}

export interface WorkQueueAttachmentMetaData {
  documentId?: string | null;
  presignedURL?: string | null;
  /** @format date-time */
  uploadTimestamp?: string;
  fileName?: string | null;
  documentType?: string | null;
  batchId?: string | null;
  tags?: string[] | null;
  isTransferable?: boolean;
}

export interface WorkQueueDocDto {
  /** @format uuid */
  workQueueDocId?: string;
  docType?: WorkQueueDocType;
  doc?: string | null;
}

export interface WorkQueueDto {
  workQueueId?: string | null;
  docType?: WorkQueueDocType;
  status?: WorkQueueStatus;
  /** @format date */
  statusDate?: string;
  locationId?: string | null;
  senderEmail?: string | null;
  hisaId?: string | null;
  horseId?: string | null;
  formData?: string | null;
  validatorMessage?: string | null;
  description?: string | null;
  workQueueAttachmentMetaDataList?: WorkQueueAttachmentMetaData[] | null;
}

export interface WorkoutResponse {
  /** @format uuid */
  workoutId?: string;
  horseId?: string | null;
  horseName?: string | null;
  country?: string | null;
  locationId?: string | null;
  locationCode?: string | null;
  locationName?: string | null;
  /** @format date */
  date?: string | null;
  distance?: string | null;
  /** @format double */
  distanceFurlong?: number | null;
  course?: string | null;
  condition?: string | null;
  type?: string | null;
  /** @format int32 */
  rank?: number | null;
  /** @format double */
  timing?: number | null;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown>
  extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  JsonApi = "application/vnd.api+json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "https://dbapi.dev1.hisausapps.org";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) =>
    fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter(
      (key) => "undefined" !== typeof query[key],
    );
    return keys
      .map((key) =>
        Array.isArray(query[key])
          ? this.addArrayQueryParam(query, key)
          : this.addQueryParam(query, key),
      )
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string")
        ? JSON.stringify(input)
        : input,
    [ContentType.JsonApi]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string")
        ? JSON.stringify(input)
        : input,
    [ContentType.Text]: (input: any) =>
      input !== null && typeof input !== "string"
        ? JSON.stringify(input)
        : input,
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
              ? JSON.stringify(property)
              : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(
    params1: RequestParams,
    params2?: RequestParams,
  ): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (
    cancelToken: CancelToken,
  ): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(
      `${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`,
      {
        ...requestParams,
        headers: {
          ...(requestParams.headers || {}),
          ...(type && type !== ContentType.FormData
            ? { "Content-Type": type }
            : {}),
        },
        signal:
          (cancelToken
            ? this.createAbortSignal(cancelToken)
            : requestParams.signal) || null,
        body:
          typeof body === "undefined" || body === null
            ? null
            : payloadFormatter(body),
      },
    ).then(async (response) => {
      const r = response.clone() as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title DataAccess API
 * @version 1.0
 * @baseUrl https://dbapi.dev1.hisausapps.org
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  address = {
    /**
     * No description
     *
     * @tags Address
     * @name IsValid
     * @request POST:/address/is-valid
     * @secure
     */
    isValid: (data: Address, params: RequestParams = {}) =>
      this.request<boolean, boolean | ProblemDetails>({
        path: `/address/is-valid`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Address
     * @name GetAddressByString
     * @request POST:/address/by-string
     * @secure
     */
    getAddressByString: (
      query?: {
        text?: string;
        /** @default "en" */
        language?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<Address, Address | ProblemDetails>({
        path: `/address/by-string`,
        method: "POST",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Address
     * @name GetAutoComplete
     * @request GET:/address/autocomplete/{text}
     * @secure
     */
    getAutoComplete: (
      text: string,
      query?: {
        /** @default "USA" */
        country?: string;
        /** @default "en" */
        language?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<Address[], ProblemDetails>({
        path: `/address/autocomplete/${text}`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),
  };
  appointments = {
    /**
     * No description
     *
     * @tags Appointment
     * @name CreateLocationAppointment
     * @request POST:/appointments/location
     * @secure
     */
    createLocationAppointment: (
      data: LocationAppointmentCreateRequest,
      params: RequestParams = {},
    ) =>
      this.request<
        LocationAppointmentResponse,
        LocationAppointmentResponse | ProblemDetails
      >({
        path: `/appointments/location`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Appointment
     * @name DeleteLocationAppointment
     * @request DELETE:/appointments/location/{locationAppointmentId}
     * @secure
     */
    deleteLocationAppointment: (
      locationAppointmentId: number,
      params: RequestParams = {},
    ) =>
      this.request<IActionResult, ProblemDetails>({
        path: `/appointments/location/${locationAppointmentId}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Appointment
     * @name CreateReport
     * @request POST:/appointments/person-schedule
     * @secure
     */
    createReport: (
      data: PersonScheduleCreateRequest,
      params: RequestParams = {},
    ) =>
      this.request<
        PersonScheduleResponse,
        PersonScheduleResponse | ProblemDetails
      >({
        path: `/appointments/person-schedule`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Appointment
     * @name DeletePersonSchedule
     * @request DELETE:/appointments/person-schedule
     * @secure
     */
    deletePersonSchedule: (
      query?: {
        /** @format int32 */
        personScheduleId?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<IActionResult, ProblemDetails>({
        path: `/appointments/person-schedule`,
        method: "DELETE",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Appointment
     * @name UpdateReport
     * @request PATCH:/appointments/person-schedule
     * @secure
     */
    updateReport: (
      data: PersonScheduleCreateRequest,
      query?: {
        /** @format int32 */
        personScheduleId?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<PersonScheduleResponse, ProblemDetails>({
        path: `/appointments/person-schedule`,
        method: "PATCH",
        query: query,
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Appointment
     * @name CreateReport2
     * @request POST:/appointments/horse-appointment
     * @originalName createReport
     * @duplicate
     * @secure
     */
    createReport2: (
      data: HorseAppointmentCreateRequest,
      params: RequestParams = {},
    ) =>
      this.request<
        HorseAppointmentResponse,
        HorseAppointmentResponse | ProblemDetails
      >({
        path: `/appointments/horse-appointment`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Appointment
     * @name DeleteHorseAppointment
     * @request DELETE:/appointments/horse-appointment
     * @secure
     */
    deleteHorseAppointment: (
      query?: {
        /** @format int32 */
        horseAppointmentId?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<IActionResult, ProblemDetails>({
        path: `/appointments/horse-appointment`,
        method: "DELETE",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Appointment
     * @name UpdateReport2
     * @request PATCH:/appointments/horse-appointment
     * @originalName updateReport
     * @duplicate
     * @secure
     */
    updateReport2: (
      data: HorseAppointmentCreateRequest,
      query?: {
        /** @format int32 */
        horseAppointmentId?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<HorseAppointmentResponse, ProblemDetails>({
        path: `/appointments/horse-appointment`,
        method: "PATCH",
        query: query,
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  assortedfield = {
    /**
     * No description
     *
     * @tags AssortedField
     * @name GetAllByField
     * @summary Get all values by field.
     * @request GET:/assortedfield/{fieldName}
     * @secure
     */
    getAllByField: (
      fieldName: string,
      query?: {
        sortBy?: string;
        /** @format int32 */
        sortDirection?: number;
        isAscSort?: boolean;
        /** @format int32 */
        page?: number;
        /** @format int32 */
        pageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<AssortedFieldSearchDto[], ProblemDetails>({
        path: `/assortedfield/${fieldName}`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags AssortedField
     * @name AddNewAssortedField
     * @summary Insert new field with values.
     * @request POST:/assortedfield
     * @secure
     */
    addNewAssortedField: (
      data: AssortedFieldRequest,
      params: RequestParams = {},
    ) =>
      this.request<
        AssortedFieldResponse,
        AssortedFieldResponse | ProblemDetails
      >({
        path: `/assortedfield`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags AssortedField
     * @name UpdateAssortedField
     * @summary Update Assorted field object.
     * @request PUT:/assortedfield/{field}/{value}
     * @secure
     */
    updateAssortedField: (
      field: string,
      value: string,
      data: AssortedFieldRequest,
      params: RequestParams = {},
    ) =>
      this.request<AssortedFieldResponse, ProblemDetails>({
        path: `/assortedfield/${field}/${value}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags AssortedField
     * @name DeleteAssortedField
     * @summary Delete field with values.
     * @request DELETE:/assortedfield/{field}/{value}
     * @secure
     */
    deleteAssortedField: (
      field: string,
      value: string,
      params: RequestParams = {},
    ) =>
      this.request<ActionResult, ProblemDetails>({
        path: `/assortedfield/${field}/${value}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags AssortedField
     * @name GetSearch
     * @summary Search Assorted field by 'text'.
     * @request GET:/assortedfield/search/{searchText}
     * @secure
     */
    getSearch: (
      searchText: string,
      query?: {
        sortBy?: string;
        /** @format int32 */
        sortDirection?: number;
        isAscSort?: boolean;
        /** @format int32 */
        page?: number;
        /** @format int32 */
        pageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<AssortedFieldSearchDto[], ProblemDetails>({
        path: `/assortedfield/search/${searchText}`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),
  };
  attestation = {
    /**
     * No description
     *
     * @tags Attestation
     * @name GetById
     * @request GET:/attestation/{attestationId}
     * @secure
     */
    getById: (attestationId: string, params: RequestParams = {}) =>
      this.request<AttestationDto, ProblemDetails>({
        path: `/attestation/${attestationId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Attestation
     * @name GetAllByTypeAndId
     * @request GET:/attestation/all-by-type/{type}/{id}
     * @secure
     */
    getAllByTypeAndId: (
      type: AttestationType,
      id: string,
      params: RequestParams = {},
    ) =>
      this.request<AttestationDto[], ProblemDetails>({
        path: `/attestation/all-by-type/${type}/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Attestation
     * @name GetAllByUser
     * @request GET:/attestation/all-by-user/{id}
     * @secure
     */
    getAllByUser: (id: string, params: RequestParams = {}) =>
      this.request<AttestationDto[], ProblemDetails>({
        path: `/attestation/all-by-user/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Attestation
     * @name Add
     * @request POST:/attestation
     * @secure
     */
    add: (data: AddAttestationRequest, params: RequestParams = {}) =>
      this.request<AttestationDto, AttestationDto | ProblemDetails>({
        path: `/attestation`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Attestation
     * @name AddAttachment
     * @request POST:/attestation/{attestationId}/add-attachment
     * @secure
     */
    addAttachment: (
      attestationId: string,
      data: {
        fileName: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<PresignedPost, PresignedPost | ProblemDetails>({
        path: `/attestation/${attestationId}/add-attachment`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Attestation
     * @name GetAttachment
     * @request POST:/attestation/{attestationId}/get-attachment
     * @secure
     */
    getAttachment: (
      attestationId: string,
      data: {
        fileName: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        AttestationAttachmentDto,
        AttestationAttachmentDto | ProblemDetails
      >({
        path: `/attestation/${attestationId}/get-attachment`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),
  };
  attestationcatalog = {
    /**
     * No description
     *
     * @tags AttestationCatalog
     * @name GetById
     * @request GET:/attestationcatalog/{attestationCatalogId}
     * @secure
     */
    getById: (attestationCatalogId: string, params: RequestParams = {}) =>
      this.request<AttestationCatalogDto, ProblemDetails>({
        path: `/attestationcatalog/${attestationCatalogId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags AttestationCatalog
     * @name Update
     * @request PUT:/attestationcatalog/{attestationCatalogId}
     * @secure
     */
    update: (
      attestationCatalogId: string,
      data: AttestationCatalogDto,
      params: RequestParams = {},
    ) =>
      this.request<AttestationCatalogDto, ProblemDetails>({
        path: `/attestationcatalog/${attestationCatalogId}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags AttestationCatalog
     * @name GetAll
     * @request GET:/attestationcatalog/all
     * @secure
     */
    getAll: (params: RequestParams = {}) =>
      this.request<AttestationCatalogDto[], ProblemDetails>({
        path: `/attestationcatalog/all`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags AttestationCatalog
     * @name GetAvailableEnvironments
     * @request GET:/attestationcatalog/get-available-environments
     * @secure
     */
    getAvailableEnvironments: (params: RequestParams = {}) =>
      this.request<string[], ProblemDetails>({
        path: `/attestationcatalog/get-available-environments`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags AttestationCatalog
     * @name GetAllByType
     * @request GET:/attestationcatalog/all/{type}
     * @secure
     */
    getAllByType: (type: AttestationType, params: RequestParams = {}) =>
      this.request<AttestationCatalogDto[], ProblemDetails>({
        path: `/attestationcatalog/all/${type}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags AttestationCatalog
     * @name Replicate
     * @request GET:/attestationcatalog/replicate/{fromEnvironment}
     * @secure
     */
    replicate: (fromEnvironment: string, params: RequestParams = {}) =>
      this.request<boolean, ProblemDetails>({
        path: `/attestationcatalog/replicate/${fromEnvironment}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags AttestationCatalog
     * @name Add
     * @request POST:/attestationcatalog
     * @secure
     */
    add: (data: AttestationCatalogDto, params: RequestParams = {}) =>
      this.request<
        AttestationCatalogDto,
        AttestationCatalogDto | ProblemDetails
      >({
        path: `/attestationcatalog`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags AttestationCatalog
     * @name Autocomplete
     * @request GET:/attestationcatalog/autocomplete/{text}
     * @secure
     */
    autocomplete: (text: string, params: RequestParams = {}) =>
      this.request<AttestationCatalogSearchDto[], ProblemDetails>({
        path: `/attestationcatalog/autocomplete/${text}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  auth = {
    /**
     * No description
     *
     * @tags Auth
     * @name GetPermissionForCurrentUser
     * @request GET:/auth/permission/list
     * @secure
     */
    getPermissionForCurrentUser: (
      query?: {
        personId?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<AuthPermissions, ProblemDetails>({
        path: `/auth/permission/list`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name TestKey
     * @request GET:/auth/permission/test-key
     * @secure
     */
    testKey: (params: RequestParams = {}) =>
      this.request<boolean, ProblemDetails>({
        path: `/auth/permission/test-key`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name AppAccessRequest
     * @request POST:/auth/request-app-access
     * @secure
     */
    appAccessRequest: (
      query: {
        /** @minLength 1 */
        userId: string;
        /** @minLength 1 */
        appName: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<ActionResult, ActionResult | ProblemDetails>({
        path: `/auth/request-app-access`,
        method: "POST",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name GetMfaContact
     * @request GET:/auth/mfa/contact
     * @secure
     */
    getMfaContact: (
      query: {
        /** @minLength 1 */
        username: string;
        /** @minLength 1 */
        mobileNumber: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<AuthMfaContactResponse, ProblemDetails>({
        path: `/auth/mfa/contact`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),
  };
  authgroup = {
    /**
     * No description
     *
     * @tags AuthGroup
     * @name GetById
     * @request GET:/authgroup/{id}
     * @secure
     */
    getById: (id: string, params: RequestParams = {}) =>
      this.request<AuthGroupResponse, ProblemDetails>({
        path: `/authgroup/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags AuthGroup
     * @name Update
     * @request PUT:/authgroup/{id}
     * @secure
     */
    update: (id: string, data: AuthGroupRequest, params: RequestParams = {}) =>
      this.request<AuthGroupResponse, ProblemDetails>({
        path: `/authgroup/${id}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags AuthGroup
     * @name GetAll
     * @request GET:/authgroup/all
     * @secure
     */
    getAll: (params: RequestParams = {}) =>
      this.request<AuthGroupResponse[], ProblemDetails>({
        path: `/authgroup/all`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags AuthGroup
     * @name Add
     * @request POST:/authgroup
     * @secure
     */
    add: (data: AuthGroupRequest, params: RequestParams = {}) =>
      this.request<AuthGroupResponse, AuthGroupResponse | ProblemDetails>({
        path: `/authgroup`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  authusergroup = {
    /**
     * No description
     *
     * @tags AuthUserGroup
     * @name GetByPersonId
     * @request GET:/authusergroup/{personId}
     * @deprecated
     * @secure
     */
    getByPersonId: (personId: string, params: RequestParams = {}) =>
      this.request<AuthUserGroupResponse[], ProblemDetails>({
        path: `/authusergroup/${personId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags AuthUserGroup
     * @name Update
     * @request PUT:/authusergroup/{personId}
     * @secure
     */
    update: (
      personId: string,
      data: AuthUserGroupRequest,
      params: RequestParams = {},
    ) =>
      this.request<AuthUserGroupResponse, ProblemDetails>({
        path: `/authusergroup/${personId}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags AuthUserGroup
     * @name SearchWorkQueue
     * @request GET:/authusergroup/get-users-by-group/{groupId}
     * @deprecated
     * @secure
     */
    searchWorkQueue: (
      groupId: string,
      query?: {
        sortBy?: string;
        /** @format int32 */
        sortDirection?: number;
        isAscSort?: boolean;
        /** @format int32 */
        page?: number;
        /** @format int32 */
        pageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<AuthUserGroupResponse[], ProblemDetails>({
        path: `/authusergroup/get-users-by-group/${groupId}`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags AuthUserGroup
     * @name ExtendedSearch
     * @request GET:/authusergroup/extended/search
     * @secure
     */
    extendedSearch: (
      query?: {
        personIds?: string[];
        objectIds?: string[];
        authGoupIds?: string[];
        sortBy?: string;
        /** @format int32 */
        sortDirection?: number;
        isAscSort?: boolean;
        /** @format int32 */
        page?: number;
        /** @format int32 */
        pageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<AuthUserGroupResponse[], ProblemDetails>({
        path: `/authusergroup/extended/search`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags AuthUserGroup
     * @name Delete
     * @request DELETE:/authusergroup/{personId}/{objectId}
     * @secure
     */
    delete: (personId: string, objectId: string, params: RequestParams = {}) =>
      this.request<ActionResult, ProblemDetails>({
        path: `/authusergroup/${personId}/${objectId}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  billableexpense = {
    /**
     * No description
     *
     * @tags BillableExpense
     * @name BillableExpenseSearch
     * @summary Search for BillableExpense.
     * @request GET:/billableexpense/billableexpensesearch/{searchText}
     * @secure
     */
    billableExpenseSearch: (
      searchText: string,
      query?: {
        sortBy?: string;
        /** @format int32 */
        sortDirection?: number;
        isAscSort?: boolean;
        /** @format int32 */
        page?: number;
        /** @format int32 */
        pageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<BillableExpenseResponse[], ProblemDetails>({
        path: `/billableexpense/billableexpensesearch/${searchText}`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags BillableExpense
     * @name GetAllBillableExpense
     * @summary Get all BillableExpense.
     * @request GET:/billableexpense/getallbillableexpense
     * @secure
     */
    getAllBillableExpense: (
      query?: {
        sortBy?: string;
        /** @format int32 */
        sortDirection?: number;
        isAscSort?: boolean;
        /** @format int32 */
        page?: number;
        /** @format int32 */
        pageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<BillableExpenseResponse[], ProblemDetails>({
        path: `/billableexpense/getallbillableexpense`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags BillableExpense
     * @name GetBillableExpenseById
     * @summary Return BillableExpense by billableExpenseId.
     * @request GET:/billableexpense/getbyid/{billableExpenseId}
     * @secure
     */
    getBillableExpenseById: (
      billableExpenseId: string,
      params: RequestParams = {},
    ) =>
      this.request<BillableExpenseResponse, ProblemDetails>({
        path: `/billableexpense/getbyid/${billableExpenseId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags BillableExpense
     * @name GetBillableExpenseByProductType
     * @summary Return BillableExpense by productType.
     * @request GET:/billableexpense/getbytype{productType}
     * @secure
     */
    getBillableExpenseByProductType: (
      productType: ProductType,
      query?: {
        sortBy?: string;
        /** @format int32 */
        sortDirection?: number;
        isAscSort?: boolean;
        /** @format int32 */
        page?: number;
        /** @format int32 */
        pageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<BillableExpenseResponse[], ProblemDetails>({
        path: `/billableexpense/getbytype${productType}`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags BillableExpense
     * @name AddNewBillableExpense
     * @summary Insert new BillableExpense.
     * @request POST:/billableexpense
     * @secure
     */
    addNewBillableExpense: (
      data: BillableExpenseRequest,
      params: RequestParams = {},
    ) =>
      this.request<
        BillableExpenseResponse,
        BillableExpenseResponse | ProblemDetails
      >({
        path: `/billableexpense`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags BillableExpense
     * @name UpdateBillableExpense
     * @summary Update BillableExpense.
     * @request PUT:/billableexpense/{billableExpenseId}
     * @secure
     */
    updateBillableExpense: (
      billableExpenseId: string,
      data: BillableExpenseRequest,
      params: RequestParams = {},
    ) =>
      this.request<BillableExpenseResponse, ProblemDetails>({
        path: `/billableexpense/${billableExpenseId}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags BillableExpense
     * @name DeleteBillableExpense
     * @summary Delete BillableExpense.
     * @request DELETE:/billableexpense/{billableExpenseId}
     * @secure
     */
    deleteBillableExpense: (
      billableExpenseId: string,
      params: RequestParams = {},
    ) =>
      this.request<ActionResult, ProblemDetails>({
        path: `/billableexpense/${billableExpenseId}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  canracerules = {
    /**
     * No description
     *
     * @tags CanRaceRules
     * @name Add
     * @request POST:/canracerules/add
     * @secure
     */
    add: (data: CanRaceRulesDto, params: RequestParams = {}) =>
      this.request<ActionResult, ActionResult | ProblemDetails>({
        path: `/canracerules/add`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags CanRaceRules
     * @name GetAll
     * @request POST:/canracerules/get-all
     * @secure
     */
    getAll: (params: RequestParams = {}) =>
      this.request<CanRaceRulesDto[], CanRaceRulesDto[] | ProblemDetails>({
        path: `/canracerules/get-all`,
        method: "POST",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags CanRaceRules
     * @name Search
     * @request GET:/canracerules/search/{searchText}
     * @secure
     */
    search: (
      searchText: string,
      query?: {
        sortBy?: string;
        /** @format int32 */
        sortDirection?: number;
        isAscSort?: boolean;
        /** @format int32 */
        page?: number;
        /** @format int32 */
        pageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<CanRaceRulesSearchDto[], ProblemDetails>({
        path: `/canracerules/search/${searchText}`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),
  };
  changehistory = {
    /**
     * No description
     *
     * @tags ChangeHistory
     * @name GetListOfTables
     * @request GET:/changehistory/get-list-of-tables
     * @secure
     */
    getListOfTables: (params: RequestParams = {}) =>
      this.request<string[], ProblemDetails>({
        path: `/changehistory/get-list-of-tables`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags ChangeHistory
     * @name GetAllChangesByTableName
     * @request GET:/changehistory/get-all-changes/{tableName}
     * @secure
     */
    getAllChangesByTableName: (
      tableName: string,
      query?: {
        /** @format int32 */
        maxRows?: number;
        includeActivities?: boolean;
        /** @format date-time */
        startDate?: string;
        /** @format date-time */
        endDate?: string;
        nextToken?: string;
        columnName?: string[];
      },
      params: RequestParams = {},
    ) =>
      this.request<ChangeHistoryResponseChangeHistoryRow, ProblemDetails>({
        path: `/changehistory/get-all-changes/${tableName}`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags ChangeHistory
     * @name GetTableByTableNameAndId
     * @request GET:/changehistory/get-changes-by-id/{tableName}/{id}
     * @secure
     */
    getTableByTableNameAndId: (
      tableName: string,
      id: string,
      query?: {
        /** @format int32 */
        maxRows?: number;
        includeActivities?: boolean;
        /** @format date-time */
        startDate?: string;
        /** @format date-time */
        endDate?: string;
        nextToken?: string;
        columnName?: string[];
      },
      params: RequestParams = {},
    ) =>
      this.request<ChangeHistoryResponseChangeHistoryRow, ProblemDetails>({
        path: `/changehistory/get-changes-by-id/${tableName}/${id}`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags ChangeHistory
     * @name GetTableByTableName
     * @request POST:/changehistory/get-changes-by-id/{tableName}
     * @secure
     */
    getTableByTableName: (
      tableName: string,
      data: string[],
      query?: {
        /** @format int32 */
        maxRows?: number;
        includeActivities?: boolean;
        /** @format date-time */
        startDate?: string;
        /** @format date-time */
        endDate?: string;
        nextToken?: string;
        columnName?: string[];
      },
      params: RequestParams = {},
    ) =>
      this.request<
        ChangeHistoryResponseChangeHistoryRow,
        ChangeHistoryResponseChangeHistoryRow | ProblemDetails
      >({
        path: `/changehistory/get-changes-by-id/${tableName}`,
        method: "POST",
        query: query,
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags ChangeHistory
     * @name GetGrouppedChanges
     * @request GET:/changehistory/get-changes-by-id/{tableName}/{id}/groups
     * @secure
     */
    getGrouppedChanges: (
      tableName: string,
      id: string,
      query?: {
        /** @format int32 */
        maxRows?: number;
        includeActivities?: boolean;
        /** @format date-time */
        startDate?: string;
        /** @format date-time */
        endDate?: string;
        nextToken?: string;
        columnName?: string[];
      },
      params: RequestParams = {},
    ) =>
      this.request<
        ChangeHistoryResponseChangeHistoryRowGrouped,
        ProblemDetails
      >({
        path: `/changehistory/get-changes-by-id/${tableName}/${id}/groups`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags ChangeHistory
     * @name GetObjectChanges
     * @request GET:/changehistory/get-changes-by-id/{tableName}/{id}/objects
     * @secure
     */
    getObjectChanges: (
      tableName: string,
      id: string,
      query?: {
        /** @format int32 */
        maxRows?: number;
        includeActivities?: boolean;
        /** @format date-time */
        startDate?: string;
        /** @format date-time */
        endDate?: string;
        nextToken?: string;
        columnName?: string[];
      },
      params: RequestParams = {},
    ) =>
      this.request<
        ChangeHistoryResponseChangeHistoryObjectData,
        ProblemDetails
      >({
        path: `/changehistory/get-changes-by-id/${tableName}/${id}/objects`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags ChangeHistory
     * @name GetObjectChangesByTableName
     * @request POST:/changehistory/get-changes-by-id/{tableName}/objects
     * @secure
     */
    getObjectChangesByTableName: (
      tableName: string,
      data: string[],
      query?: {
        /** @format int32 */
        maxRows?: number;
        includeActivities?: boolean;
        /** @format date-time */
        startDate?: string;
        /** @format date-time */
        endDate?: string;
        nextToken?: string;
        columnName?: string[];
      },
      params: RequestParams = {},
    ) =>
      this.request<
        ChangeHistoryResponseChangeHistoryObjectData,
        ChangeHistoryResponseChangeHistoryObjectData | ProblemDetails
      >({
        path: `/changehistory/get-changes-by-id/${tableName}/objects`,
        method: "POST",
        query: query,
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  v2 = {
    /**
     * No description
     *
     * @tags ChangeHistoryV2
     * @name GetEntityHistoryAsync
     * @summary Get history information for a specific entity
     * @request GET:/v2/changehistory/{entityName}/{entityId}
     * @secure
     */
    getEntityHistoryAsync: (
      entityName: string,
      entityId: string,
      query?: {
        includeActivities?: boolean;
        /** @format date-time */
        startDate?: string | null;
        /** @format date-time */
        endDate?: string | null;
        isAscSort?: boolean;
        /**
         * @format int32
         * @min 0
         */
        page?: number;
        /**
         * @format int32
         * @min 0
         * @exclusiveMin true
         * @max 100
         */
        pageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<ChangeHistoryV2Response, ProblemDetails>({
        path: `/v2/changehistory/${entityName}/${entityId}`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),
  };
  dynatrace = {
    /**
     * No description
     *
     * @tags Dynatrace
     * @name GetUserSession
     * @request GET:/dynatrace/session/{sessionId}
     * @secure
     */
    getUserSession: (sessionId: string, params: RequestParams = {}) =>
      this.request<DynatraceSession, ProblemDetails>({
        path: `/dynatrace/session/${sessionId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Dynatrace
     * @name GetUserSessions
     * @request GET:/dynatrace/sessions
     * @secure
     */
    getUserSessions: (
      query?: {
        userIds?: string[];
        /** @format date-time */
        startDate?: string;
        /** @format date-time */
        endDate?: string;
        sortBy?: string;
        /** @format int32 */
        sortDirection?: number;
        isAscSort?: boolean;
        /** @format int32 */
        page?: number;
        /** @format int32 */
        pageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<DynatraceSession[], ProblemDetails>({
        path: `/dynatrace/sessions`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Dynatrace
     * @name GetUnprocessedSessions
     * @request GET:/dynatrace/sessions/unprocessed
     * @secure
     */
    getUnprocessedSessions: (
      query?: {
        /** @format date-time */
        startDate?: string;
        /** @format date-time */
        endDate?: string;
        sortBy?: string;
        /** @format int32 */
        sortDirection?: number;
        isAscSort?: boolean;
        /** @format int32 */
        page?: number;
        /** @format int32 */
        pageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<DynatraceSession[], ProblemDetails>({
        path: `/dynatrace/sessions/unprocessed`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Dynatrace
     * @name InsertSessions
     * @request POST:/dynatrace/sessions/bulk
     * @secure
     */
    insertSessions: (data: DynatraceSession[], params: RequestParams = {}) =>
      this.request<ActionResult, ActionResult | ProblemDetails>({
        path: `/dynatrace/sessions/bulk`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Dynatrace
     * @name UpdateSession
     * @request PUT:/dynatrace/session
     * @secure
     */
    updateSession: (data: DynatraceSession, params: RequestParams = {}) =>
      this.request<ActionResult, ProblemDetails>({
        path: `/dynatrace/session`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Dynatrace
     * @name DownloadSession
     * @request GET:/dynatrace/sessions/{sessionId}/download
     * @secure
     */
    downloadSession: (sessionId: string, params: RequestParams = {}) =>
      this.request<DocumentFileResponse, ProblemDetails>({
        path: `/dynatrace/sessions/${sessionId}/download`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Dynatrace
     * @name UploadSession
     * @request GET:/dynatrace/sessions/{sessionId}/upload
     * @secure
     */
    uploadSession: (sessionId: string, params: RequestParams = {}) =>
      this.request<DocumentFileResponse, ProblemDetails>({
        path: `/dynatrace/sessions/${sessionId}/upload`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  files = {
    /**
     * No description
     *
     * @tags Files
     * @name FileOperations
     * @request POST:/files/fileoperations
     * @secure
     */
    fileOperations: (
      data: FileManagerDirectoryContent,
      query?: {
        subFolder?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<any, ProblemDetails>({
        path: `/files/fileoperations`,
        method: "POST",
        query: query,
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Files
     * @name Upload
     * @request POST:/files/upload
     * @secure
     */
    upload: (
      data: {
        path?: string;
        uploadFiles?: File[];
        action?: string;
        data?: string;
      },
      query?: {
        subFolder?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<FileManagerResponse, FileManagerResponse | ProblemDetails>({
        path: `/files/upload`,
        method: "POST",
        query: query,
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Files
     * @name Download
     * @request POST:/files/download
     * @secure
     */
    download: (
      data: {
        downloadInput?: string;
      },
      query?: {
        subFolder?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<IActionResult, IActionResult | ProblemDetails>({
        path: `/files/download`,
        method: "POST",
        query: query,
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Files
     * @name GetImage
     * @request GET:/files/getimage
     * @secure
     */
    getImage: (
      data: {
        path?: string;
        action?: string;
        newName?: string;
        names?: string[];
        name?: string;
        /** @format int64 */
        size?: number;
        previousName?: string;
        /** @format date-time */
        dateModified?: string;
        /** @format date-time */
        dateCreated?: string;
        hasChild?: boolean;
        isFile?: boolean;
        type?: string;
        id?: string;
        filterPath?: string;
        filterId?: string;
        parentId?: string;
        targetPath?: string;
        renameFiles?: string[];
        uploadFiles?: File[];
        caseSensitive?: boolean;
        searchString?: string;
        showHiddenItems?: boolean;
        showFileExtension?: boolean;
        data?: FileManagerDirectoryContent[];
        "targetData.path"?: string;
        "targetData.action"?: string;
        "targetData.newName"?: string;
        "targetData.names"?: string[];
        "targetData.name"?: string;
        /** @format int64 */
        "targetData.size"?: number;
        "targetData.previousName"?: string;
        /** @format date-time */
        "targetData.dateModified"?: string;
        /** @format date-time */
        "targetData.dateCreated"?: string;
        "targetData.hasChild"?: boolean;
        "targetData.isFile"?: boolean;
        "targetData.type"?: string;
        "targetData.id"?: string;
        "targetData.filterPath"?: string;
        "targetData.filterId"?: string;
        "targetData.parentId"?: string;
        "targetData.targetPath"?: string;
        "targetData.renameFiles"?: string[];
        "targetData.uploadFiles"?: File[];
        "targetData.caseSensitive"?: boolean;
        "targetData.searchString"?: string;
        "targetData.showHiddenItems"?: boolean;
        "targetData.showFileExtension"?: boolean;
        "targetData.data"?: FileManagerDirectoryContent[];
        "targetData.targetData.path"?: string;
        "targetData.targetData.action"?: string;
        "targetData.targetData.newName"?: string;
        "targetData.targetData.names"?: string[];
        "targetData.targetData.name"?: string;
        /** @format int64 */
        "targetData.targetData.size"?: number;
        "targetData.targetData.previousName"?: string;
        /** @format date-time */
        "targetData.targetData.dateModified"?: string;
        /** @format date-time */
        "targetData.targetData.dateCreated"?: string;
        "targetData.targetData.hasChild"?: boolean;
        "targetData.targetData.isFile"?: boolean;
        "targetData.targetData.type"?: string;
        "targetData.targetData.id"?: string;
        "targetData.targetData.filterPath"?: string;
        "targetData.targetData.filterId"?: string;
        "targetData.targetData.parentId"?: string;
        "targetData.targetData.targetPath"?: string;
        "targetData.targetData.renameFiles"?: string[];
        "targetData.targetData.uploadFiles"?: File[];
        "targetData.targetData.caseSensitive"?: boolean;
        "targetData.targetData.searchString"?: string;
        "targetData.targetData.showHiddenItems"?: boolean;
        "targetData.targetData.showFileExtension"?: boolean;
        "targetData.targetData.data"?: FileManagerDirectoryContent[];
        "targetData.targetData.targetData"?: FileManagerDirectoryContent;
        "targetData.targetData.permission.copy"?: boolean;
        "targetData.targetData.permission.download"?: boolean;
        "targetData.targetData.permission.write"?: boolean;
        "targetData.targetData.permission.writeContents"?: boolean;
        "targetData.targetData.permission.read"?: boolean;
        "targetData.targetData.permission.upload"?: boolean;
        "targetData.targetData.permission.message"?: string;
        "targetData.permission.copy"?: boolean;
        "targetData.permission.download"?: boolean;
        "targetData.permission.write"?: boolean;
        "targetData.permission.writeContents"?: boolean;
        "targetData.permission.read"?: boolean;
        "targetData.permission.upload"?: boolean;
        "targetData.permission.message"?: string;
        "permission.copy"?: boolean;
        "permission.download"?: boolean;
        "permission.write"?: boolean;
        "permission.writeContents"?: boolean;
        "permission.read"?: boolean;
        "permission.upload"?: boolean;
        "permission.message"?: string;
      },
      query?: {
        path?: string;
        subFolder?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<IActionResult, ProblemDetails>({
        path: `/files/getimage`,
        method: "GET",
        query: query,
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Files
     * @name Preview
     * @request GET:/files/preview
     * @secure
     */
    preview: (
      query?: {
        subFolder?: string;
        fileName?: string;
        path?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<IActionResult, ProblemDetails>({
        path: `/files/preview`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),
  };
  frontendnotification = {
    /**
     * No description
     *
     * @tags FrontEndNotification
     * @name Delete
     * @request DELETE:/frontendnotification/{frontEndNotificationId}/delete
     * @secure
     */
    delete: (frontEndNotificationId: string, params: RequestParams = {}) =>
      this.request<string[], ProblemDetails>({
        path: `/frontendnotification/${frontEndNotificationId}/delete`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags FrontEndNotification
     * @name GetByIdAsync
     * @request GET:/frontendnotification/{frontEndNotificationId}
     * @secure
     */
    getByIdAsync: (
      frontEndNotificationId: string,
      params: RequestParams = {},
    ) =>
      this.request<FrontEndNotificationResponseModel, ProblemDetails>({
        path: `/frontendnotification/${frontEndNotificationId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags FrontEndNotification
     * @name Update
     * @request PUT:/frontendnotification/{frontEndNotificationId}
     * @secure
     */
    update: (
      frontEndNotificationId: string,
      data: FrontEndNotificationRequest,
      params: RequestParams = {},
    ) =>
      this.request<FrontEndNotificationResponseModel, ProblemDetails>({
        path: `/frontendnotification/${frontEndNotificationId}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags FrontEndNotification
     * @name Search
     * @request GET:/frontendnotification/search/{searchText}
     * @secure
     */
    search: (
      searchText: string,
      query?: {
        sortBy?: string;
        /** @format int32 */
        sortDirection?: number;
        isAscSort?: boolean;
        /** @format int32 */
        page?: number;
        /** @format int32 */
        pageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<FrontEndNotificationFullResponse[], ProblemDetails>({
        path: `/frontendnotification/search/${searchText}`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags FrontEndNotification
     * @name SearchActive
     * @request GET:/frontendnotification/search-active/{searchText}
     * @secure
     */
    searchActive: (
      searchText: string,
      query?: {
        sortBy?: string;
        /** @format int32 */
        sortDirection?: number;
        isAscSort?: boolean;
        /** @format int32 */
        page?: number;
        /** @format int32 */
        pageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<FrontEndNotificationFullResponse[], ProblemDetails>({
        path: `/frontendnotification/search-active/${searchText}`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags FrontEndNotification
     * @name GetActiveByPageIdActive
     * @request GET:/frontendnotification/get-active-by-page/{pageId}
     * @secure
     */
    getActiveByPageIdActive: (pageId: string, params: RequestParams = {}) =>
      this.request<FrontEndNotificationFullResponse[], ProblemDetails>({
        path: `/frontendnotification/get-active-by-page/${pageId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags FrontEndNotification
     * @name GetUserActiveByPageIdActive
     * @request GET:/frontendnotification/get-active-by-page-and-user/{pageId}
     * @secure
     */
    getUserActiveByPageIdActive: (pageId: string, params: RequestParams = {}) =>
      this.request<FrontEndNotificationFullResponse[], ProblemDetails>({
        path: `/frontendnotification/get-active-by-page-and-user/${pageId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags FrontEndNotification
     * @name GetAllActiveByUser
     * @request GET:/frontendnotification/get-active-by-user
     * @secure
     */
    getAllActiveByUser: (params: RequestParams = {}) =>
      this.request<FrontEndNotificationFullResponse[], ProblemDetails>({
        path: `/frontendnotification/get-active-by-user`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags FrontEndNotification
     * @name LogUserResponse
     * @request POST:/frontendnotification/log-user-response/{frontEndNotificationId}
     * @secure
     */
    logUserResponse: (
      frontEndNotificationId: string,
      query?: {
        response?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<ActionResult, ActionResult | ProblemDetails>({
        path: `/frontendnotification/log-user-response/${frontEndNotificationId}`,
        method: "POST",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags FrontEndNotification
     * @name LogUserShow
     * @request POST:/frontendnotification/log-user-show/{frontEndNotificationId}
     * @secure
     */
    logUserShow: (frontEndNotificationId: string, params: RequestParams = {}) =>
      this.request<ActionResult, ActionResult | ProblemDetails>({
        path: `/frontendnotification/log-user-show/${frontEndNotificationId}`,
        method: "POST",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags FrontEndNotification
     * @name GetByNotificationIdAsync
     * @request GET:/frontendnotification/get-user-response/{frontEndNotificationId}
     * @secure
     */
    getByNotificationIdAsync: (
      frontEndNotificationId: string,
      params: RequestParams = {},
    ) =>
      this.request<FrontEndNotificationFullResponse, ProblemDetails>({
        path: `/frontendnotification/get-user-response/${frontEndNotificationId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags FrontEndNotification
     * @name Add
     * @request POST:/frontendnotification
     * @secure
     */
    add: (data: FrontEndNotificationRequest, params: RequestParams = {}) =>
      this.request<
        FrontEndNotificationResponseModel,
        FrontEndNotificationResponseModel | ProblemDetails
      >({
        path: `/frontendnotification`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  healthcheck = {
    /**
     * No description
     *
     * @tags HealthCheck
     * @name CheckHealth
     * @summary Check Health API.
     * @request GET:/healthcheck/healthcheck
     * @secure
     */
    checkHealth: (params: RequestParams = {}) =>
      this.request<IActionResult, ProblemDetails>({
        path: `/healthcheck/healthcheck`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags HealthCheck
     * @name CheckElastic
     * @summary Check Health Elastic.
     * @request GET:/healthcheck/elastichealthcheck/{tableName}
     * @secure
     */
    checkElastic: (tableName: string, params: RequestParams = {}) =>
      this.request<boolean, ProblemDetails>({
        path: `/healthcheck/elastichealthcheck/${tableName}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags HealthCheck
     * @name CheckDynamoDb
     * @summary Check Health DB.
     * @request GET:/healthcheck/dynamodbhealthcheck/{tableName}
     * @secure
     */
    checkDynamoDb: (tableName: string, params: RequestParams = {}) =>
      this.request<boolean, ProblemDetails>({
        path: `/healthcheck/dynamodbhealthcheck/${tableName}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  api = {
    /**
     * No description
     *
     * @tags HelpDeskNotes
     * @name HelpDeskNotesSearch
     * @summary Search for HelpDeskNotes.
     * @request GET:/api/helpdesknotes/helpdesknotessearch/{searchText}
     * @deprecated
     * @secure
     */
    helpDeskNotesSearch: (
      searchText: string,
      query?: {
        sortBy?: string;
        /** @format int32 */
        sortDirection?: number;
        isAscSort?: boolean;
        /** @format int32 */
        page?: number;
        /** @format int32 */
        pageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<HelpDeskNotesResponse[], ProblemDetails>({
        path: `/api/helpdesknotes/helpdesknotessearch/${searchText}`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags HelpDeskNotes
     * @name GetHelpDeskNotesById
     * @summary Return HelpDeskNotes by NoteId.
     * @request GET:/api/helpdesknotes/{noteId}
     * @secure
     */
    getHelpDeskNotesById: (noteId: string, params: RequestParams = {}) =>
      this.request<HelpDeskNotesResponse, ProblemDetails>({
        path: `/api/helpdesknotes/${noteId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags HelpDeskNotes
     * @name UpdateHelpDeskNotesDto
     * @summary Update HelpDeskNotes.
     * @request PUT:/api/helpdesknotes/{noteId}
     * @secure
     */
    updateHelpDeskNotesDto: (
      noteId: string,
      data: HelpDeskNotesRequest,
      params: RequestParams = {},
    ) =>
      this.request<HelpDeskNotesResponse, ProblemDetails>({
        path: `/api/helpdesknotes/${noteId}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags HelpDeskNotes
     * @name DeleteHelpDeskNote
     * @summary Delete HelpDeskNotes.
     * @request DELETE:/api/helpdesknotes/{noteId}
     * @secure
     */
    deleteHelpDeskNote: (noteId: string, params: RequestParams = {}) =>
      this.request<ActionResult, ProblemDetails>({
        path: `/api/helpdesknotes/${noteId}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags HelpDeskNotes
     * @name GetAllHelpDeskNotes
     * @summary Get all HelpDeskNotes.
     * @request GET:/api/helpdesknotes/getallhelpdesknotes
     * @deprecated
     * @secure
     */
    getAllHelpDeskNotes: (
      query?: {
        sortBy?: string;
        /** @format int32 */
        sortDirection?: number;
        isAscSort?: boolean;
        /** @format int32 */
        page?: number;
        /** @format int32 */
        pageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<HelpDeskNotesResponse[], ProblemDetails>({
        path: `/api/helpdesknotes/getallhelpdesknotes`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags HelpDeskNotes
     * @name SearchAsync
     * @summary Search helpDeskNotes.
     * @request GET:/api/helpdesknotes/search
     * @secure
     */
    searchAsync: (
      query?: {
        search?: string;
        includeDeleted?: boolean;
        sortBy?: string;
        /** @format int32 */
        sortDirection?: number;
        isAscSort?: boolean;
        /** @format int32 */
        page?: number;
        /** @format int32 */
        pageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<HelpDeskNotesResponse[], ProblemDetails>({
        path: `/api/helpdesknotes/search`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags HelpDeskNotes
     * @name AddNewHelpDeskNotes
     * @summary Insert new HelpDeskNotes.
     * @request POST:/api/helpdesknotes
     * @secure
     */
    addNewHelpDeskNotes: (
      data: HelpDeskNotesRequest,
      params: RequestParams = {},
    ) =>
      this.request<
        HelpDeskNotesResponse,
        HelpDeskNotesResponse | ProblemDetails
      >({
        path: `/api/helpdesknotes`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags HelpDeskNotes
     * @name AddDocument
     * @request POST:/api/helpdesknotes/{noteId}/document/add
     * @secure
     */
    addDocument: (
      noteId: string,
      data: {
        fileName: string;
        type: LocationFormType;
        tags?: string[];
        /** @default "" */
        personId?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<PresignedPost, PresignedPost | ProblemDetails>({
        path: `/api/helpdesknotes/${noteId}/document/add`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags HelpDeskNotes
     * @name GetAllDocuments
     * @request GET:/api/helpdesknotes/{noteId}/document/all
     * @secure
     */
    getAllDocuments: (noteId: string, params: RequestParams = {}) =>
      this.request<DocumentFileResponse[], ProblemDetails>({
        path: `/api/helpdesknotes/${noteId}/document/all`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  horse = {
    /**
     * No description
     *
     * @tags Horse
     * @name GetCanRace
     * @request GET:/horse/{horseId}/can-race/{date}
     * @secure
     */
    getCanRace: (horseId: string, date: string, params: RequestParams = {}) =>
      this.request<CanRaceHorseResponse, ProblemDetails>({
        path: `/horse/${horseId}/can-race/${date}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Horse
     * @name GetCanRaceByDateRange
     * @request GET:/horse/{horseId}/can-race-by-date-range
     * @secure
     */
    getCanRaceByDateRange: (
      horseId: string,
      query?: {
        /** @format date */
        startDate?: string;
        /** @format date */
        endDate?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<CanRaceHorseResponse[], ProblemDetails>({
        path: `/horse/${horseId}/can-race-by-date-range`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Horse
     * @name GetCanRaceAry
     * @request POST:/horse/can-race-ary
     * @secure
     */
    getCanRaceAry: (
      data: HorseCanRaceByArrayRequest,
      params: RequestParams = {},
    ) =>
      this.request<
        CanRaceHorseResponse[],
        CanRaceHorseResponse[] | ProblemDetails
      >({
        path: `/horse/can-race-ary`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Horse
     * @name GetById
     * @request GET:/horse/{horseId}
     * @secure
     */
    getById: (horseId: string, params: RequestParams = {}) =>
      this.request<CoveredHorseResponse, ProblemDetails>({
        path: `/horse/${horseId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Horse
     * @name Update
     * @request PUT:/horse/{horseId}
     * @secure
     */
    update: (
      horseId: string,
      data: CoveredHorseUpdateRequest,
      params: RequestParams = {},
    ) =>
      this.request<CoveredHorseResponse, ProblemDetails>({
        path: `/horse/${horseId}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Horse
     * @name Patch
     * @request PATCH:/horse/{horseId}
     * @secure
     */
    patch: (
      horseId: string,
      data: CoveredHorsePatchRequest,
      params: RequestParams = {},
    ) =>
      this.request<CoveredHorseResponse, ProblemDetails>({
        path: `/horse/${horseId}`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Horse
     * @name BatchGet
     * @request PUT:/horse/batch-get
     * @secure
     */
    batchGet: (data: string[], params: RequestParams = {}) =>
      this.request<CoveredHorseResponse[], ProblemDetails>({
        path: `/horse/batch-get`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Horse
     * @name BatchGetExtendedData
     * @request PUT:/horse/extended
     * @secure
     */
    batchGetExtendedData: (data: string[], params: RequestParams = {}) =>
      this.request<CoveredHorseExtendedResponse[], ProblemDetails>({
        path: `/horse/extended`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Horse
     * @name BatchUpdate
     * @request PUT:/horse/batch-update
     * @secure
     */
    batchUpdate: (data: CoveredHorseRequest[], params: RequestParams = {}) =>
      this.request<ActionResult, ProblemDetails>({
        path: `/horse/batch-update`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Horse
     * @name Autocomplete
     * @request GET:/horse/autocomplete/{name}
     * @secure
     */
    autocomplete: (name: string, params: RequestParams = {}) =>
      this.request<HorseAutocomplete[], ProblemDetails>({
        path: `/horse/autocomplete/${name}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Horse
     * @name GetRecentActivities
     * @request GET:/horse/{horseId}/activities/recent
     * @secure
     */
    getRecentActivities: (horseId: string, params: RequestParams = {}) =>
      this.request<CoveredHorseActivities, ProblemDetails>({
        path: `/horse/${horseId}/activities/recent`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Horse
     * @name SetCanRaceOverrides
     * @request POST:/horse/{horseId}/can-race/override
     * @secure
     */
    setCanRaceOverrides: (
      horseId: string,
      data: HorseCanRaceOverrideRequest,
      params: RequestParams = {},
    ) =>
      this.request<ActionResult, ActionResult | ProblemDetails>({
        path: `/horse/${horseId}/can-race/override`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Horse
     * @name EnterRace
     * @request POST:/horse/{horseId}/enter-a-race
     * @secure
     */
    enterRace: (
      horseId: string,
      data: EnterRaceRequest,
      params: RequestParams = {},
    ) =>
      this.request<ActionResult, ActionResult | ProblemDetails>({
        path: `/horse/${horseId}/enter-a-race`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Horse
     * @name Register
     * @request POST:/horse
     * @secure
     */
    register: (data: CoveredHorseCreateRequest, params: RequestParams = {}) =>
      this.request<CoveredHorseResponse, CoveredHorseResponse | ProblemDetails>(
        {
          path: `/horse`,
          method: "POST",
          body: data,
          secure: true,
          type: ContentType.Json,
          format: "json",
          ...params,
        },
      ),

    /**
     * No description
     *
     * @tags Horse
     * @name FindOrCreate
     * @request POST:/horse/find-create
     * @secure
     */
    findOrCreate: (
      data: CoveredHorseFindCreateRequest,
      params: RequestParams = {},
    ) =>
      this.request<CoveredHorseResponse, CoveredHorseResponse | ProblemDetails>(
        {
          path: `/horse/find-create`,
          method: "POST",
          body: data,
          secure: true,
          type: ContentType.Json,
          format: "json",
          ...params,
        },
      ),

    /**
     * No description
     *
     * @tags Horse
     * @name GetTjcStatus
     * @request GET:/horse/{horseId}/get-tjc-reg-status
     * @secure
     */
    getTjcStatus: (horseId: string, params: RequestParams = {}) =>
      this.request<TjcDetailsResponse, ProblemDetails>({
        path: `/horse/${horseId}/get-tjc-reg-status`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Horse
     * @name GetVacceneCard
     * @request GET:/horse/{horseId}/get-vaccine-card
     * @secure
     */
    getVacceneCard: (horseId: string, params: RequestParams = {}) =>
      this.request<VaccineCardModel, ProblemDetails>({
        path: `/horse/${horseId}/get-vaccine-card`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Horse
     * @name SetTjcDetails
     * @request POST:/horse/{horseId}/update-tjc-reg
     * @secure
     */
    setTjcDetails: (horseId: string, params: RequestParams = {}) =>
      this.request<TjcDetailsResponse, TjcDetailsResponse | ProblemDetails>({
        path: `/horse/${horseId}/update-tjc-reg`,
        method: "POST",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Horse
     * @name FindHorseNamesById
     * @request POST:/horse/find-names-by-ids
     * @secure
     */
    findHorseNamesById: (data: string[], params: RequestParams = {}) =>
      this.request<HorseNameResponse[], HorseNameResponse[] | ProblemDetails>({
        path: `/horse/find-names-by-ids`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Horse
     * @name GetHorsesByAttendingVetAsync
     * @request GET:/horse/by-attending-vet/{personId}
     * @secure
     */
    getHorsesByAttendingVetAsync: (
      personId: string,
      params: RequestParams = {},
    ) =>
      this.request<CoveredHorseResponse[], ProblemDetails>({
        path: `/horse/by-attending-vet/${personId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Horse
     * @name ForceRefreshHorseActivities
     * @request GET:/horse/{horseId}/force-tjc-activity-refresh
     * @secure
     */
    forceRefreshHorseActivities: (
      horseId: string,
      params: RequestParams = {},
    ) =>
      this.request<CoveredHorseResponse, ProblemDetails>({
        path: `/horse/${horseId}/force-tjc-activity-refresh`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Horse
     * @name GetHorseMicrochips
     * @request GET:/horse/{horseId}/microchips
     * @secure
     */
    getHorseMicrochips: (horseId: string, params: RequestParams = {}) =>
      this.request<number[], ProblemDetails>({
        path: `/horse/${horseId}/microchips`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Horse
     * @name GetMicrochips
     * @request GET:/horse/microchips
     * @secure
     */
    getMicrochips: (data: HorseMicrochipsQuery, params: RequestParams = {}) =>
      this.request<number[], ProblemDetails>({
        path: `/horse/microchips`,
        method: "GET",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Horse
     * @name DocumentMakeNonTransferable
     * @request PUT:/horse/{horseId}/document/{documentId}/set-transferable/{isTransferable}
     * @secure
     */
    documentMakeNonTransferable: (
      horseId: string,
      documentId: string,
      isTransferable: boolean,
      params: RequestParams = {},
    ) =>
      this.request<ActionResult, ProblemDetails>({
        path: `/horse/${horseId}/document/${documentId}/set-transferable/${isTransferable}`,
        method: "PUT",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Horse
     * @name AddDocument
     * @request POST:/horse/{horseId}/document/add
     * @secure
     */
    addDocument: (
      horseId: string,
      data: {
        isTransferable: boolean;
        fileName: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<PresignedPost, PresignedPost | ProblemDetails>({
        path: `/horse/${horseId}/document/add`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Horse
     * @name MoveDocumentsToAnotherHorse
     * @request GET:/horse/{horseId}/document/{documentId}/move-to-another-horse/{destinationHorseId}
     * @secure
     */
    moveDocumentsToAnotherHorse: (
      horseId: string,
      documentId: string,
      destinationHorseId: string,
      params: RequestParams = {},
    ) =>
      this.request<ActionResult, ProblemDetails>({
        path: `/horse/${horseId}/document/${documentId}/move-to-another-horse/${destinationHorseId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Horse
     * @name GetAllDocuments
     * @request GET:/horse/{horseId}/document/all
     * @secure
     */
    getAllDocuments: (
      horseId: string,
      query?: {
        sortBy?: string;
        /** @format int32 */
        sortDirection?: number;
        isAscSort?: boolean;
        /** @format int32 */
        page?: number;
        /** @format int32 */
        pageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<DocumentFileResponse[], ProblemDetails>({
        path: `/horse/${horseId}/document/all`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Horse
     * @name DeleteDocument
     * @request DELETE:/horse/{horseId}/document/{documentId}
     * @secure
     */
    deleteDocument: (
      horseId: string,
      documentId: string,
      params: RequestParams = {},
    ) =>
      this.request<ActionResult, ProblemDetails>({
        path: `/horse/${horseId}/document/${documentId}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Horse
     * @name GetSearch
     * @request GET:/horse/search
     * @secure
     */
    getSearch: (
      query?: {
        searchText?: string;
        name?: string;
        damName?: string;
        /** @format int32 */
        yearOfBirth?: number;
        ownerHisaId?: string;
        ownerName?: string;
        locationId?: string;
        /** @format int32 */
        tjcId?: number;
        responsiblePersonHisaId?: string;
        responsiblePersonName?: string;
        /** @format date */
        "lastStartDate.startDate"?: string;
        /** @format date */
        "lastStartDate.endDate"?: string;
        /** @format date */
        "lastWorkDate.startDate"?: string;
        /** @format date */
        "lastWorkDate.endDate"?: string;
        horseStatuses?: HorseStatus[];
        excludedHorseStatuses?: HorseStatus[];
        hisaHorseIds?: string[];
        attendingVets?: string[];
        owners?: string[];
        responsiblePersons?: string[];
        ownerships?: string[];
        useExactMatch?: boolean;
        excludeUnregistered?: boolean;
        sortBy?: string;
        /** @format int32 */
        sortDirection?: number;
        isAscSort?: boolean;
        /** @format int32 */
        page?: number;
        /** @format int32 */
        pageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<CoveredHorseSearchResponse[], ProblemDetails>({
        path: `/horse/search`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Horse
     * @name GetHorsesUpdatedByDateAsync
     * @request GET:/horse/update
     * @secure
     */
    getHorsesUpdatedByDateAsync: (
      query?: {
        /** @format date-time */
        adjustedEndDate?: string;
        /** @format date-time */
        startDate?: string;
        /** @format date-time */
        endDate?: string;
        sortBy?: string;
        /** @format int32 */
        sortDirection?: number;
        isAscSort?: boolean;
        /** @format int32 */
        page?: number;
        /** @format int32 */
        pageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<CoveredHorseResponse[], ProblemDetails>({
        path: `/horse/update`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Horse
     * @name GetUnregisteredHorses
     * @request GET:/horse/unregistered
     * @secure
     */
    getUnregisteredHorses: (
      query?: {
        horseName?: string;
        sortBy?: string;
        /** @format int32 */
        sortDirection?: number;
        isAscSort?: boolean;
        /** @format int32 */
        page?: number;
        /** @format int32 */
        pageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<CoveredHorseResponse[], ProblemDetails>({
        path: `/horse/unregistered`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Horse
     * @name GetAllHorsesByJockeyId
     * @request POST:/horse/history/search-by-jockey/{jockeyId}
     * @secure
     */
    getAllHorsesByJockeyId: (
      jockeyId: string,
      query?: {
        sortBy?: string;
        /** @format int32 */
        sortDirection?: number;
        isAscSort?: boolean;
        /** @format int32 */
        page?: number;
        /** @format int32 */
        pageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        CoveredHorseSearchResponse[],
        CoveredHorseSearchResponse[] | ProblemDetails
      >({
        path: `/horse/history/search-by-jockey/${jockeyId}`,
        method: "POST",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Horse
     * @name GetAllHorsesByLocation
     * @request POST:/horse/history/search-by-location/{locationId}
     * @secure
     */
    getAllHorsesByLocation: (
      locationId: string,
      query?: {
        /** @format date */
        dateToSearch?: string;
        sortBy?: string;
        /** @format int32 */
        sortDirection?: number;
        isAscSort?: boolean;
        /** @format int32 */
        page?: number;
        /** @format int32 */
        pageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        CoveredHorseSearchResponse[],
        CoveredHorseSearchResponse[] | ProblemDetails
      >({
        path: `/horse/history/search-by-location/${locationId}`,
        method: "POST",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Horse
     * @name GetAllHorseWorkedAtTheTrackInTheLast30Days
     * @request POST:/horse/history/all-horses-that-ran-or-worked-in-the-last-30-days/{locationId}
     * @secure
     */
    getAllHorseWorkedAtTheTrackInTheLast30Days: (
      locationId: string,
      query?: {
        sortBy?: string;
        /** @format int32 */
        sortDirection?: number;
        isAscSort?: boolean;
        /** @format int32 */
        page?: number;
        /** @format int32 */
        pageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        CoveredHorseSearchResponse[],
        CoveredHorseSearchResponse[] | ProblemDetails
      >({
        path: `/horse/history/all-horses-that-ran-or-worked-in-the-last-30-days/${locationId}`,
        method: "POST",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Horse
     * @name GetByIds
     * @request POST:/horse/search-by-ids
     * @secure
     */
    getByIds: (data: string[], params: RequestParams = {}) =>
      this.request<
        CoveredHorseSearchResponse[],
        CoveredHorseSearchResponse[] | ProblemDetails
      >({
        path: `/horse/search-by-ids`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Horse
     * @name GetByPerson
     * @request GET:/horse/search-by-person/{hisaId}/{searchText}
     * @secure
     */
    getByPerson: (
      hisaId: string,
      searchText: string,
      query?: {
        horseStatuses?: HorseStatus[];
        excludedHorseStatuses?: HorseStatus[];
        sortBy?: string;
        /** @format int32 */
        sortDirection?: number;
        isAscSort?: boolean;
        /** @format int32 */
        page?: number;
        /** @format int32 */
        pageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<CoveredHorseSearchResponse[], ProblemDetails>({
        path: `/horse/search-by-person/${hisaId}/${searchText}`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Horse
     * @name GetByPerson2
     * @request GET:/horse/search-by-person
     * @originalName getByPerson
     * @duplicate
     * @secure
     */
    getByPerson2: (
      query?: {
        searchText?: string;
        ownerHisaId?: string;
        responsiblePersonHisaId?: string;
        sortBy?: string;
        /** @format int32 */
        sortDirection?: number;
        isAscSort?: boolean;
        /** @format int32 */
        page?: number;
        /** @format int32 */
        pageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<CoveredHorseSearchResponse[], ProblemDetails>({
        path: `/horse/search-by-person`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags HorseAttendingVet
     * @name Change
     * @summary Add new attending vet to the horse.
     * @request POST:/horse/attending-vet/add
     * @secure
     */
    change: (data: HorseAddAttendingVetRequest, params: RequestParams = {}) =>
      this.request<ActionResult, ActionResult | ProblemDetails>({
        path: `/horse/attending-vet/add`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags HorseAttendingVet
     * @name Remove
     * @summary Remove attending vet to the horse.
     * @request POST:/horse/attending-vet/remove
     * @secure
     */
    remove: (
      data: HorseRemoveAttendingVetRequest,
      params: RequestParams = {},
    ) =>
      this.request<ActionResult, ActionResult | ProblemDetails>({
        path: `/horse/attending-vet/remove`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags HorseChangeOwner
     * @name ChangeOwner
     * @request POST:/horse/change-owner
     * @secure
     */
    changeOwner: (data: HorseChangeOwnerRequest, params: RequestParams = {}) =>
      this.request<ActionResult, ActionResult | ProblemDetails>({
        path: `/horse/change-owner`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags HorseChangeOwner
     * @name WithoutConfirmation
     * @summary Changes the owner of a horse without requiring confirmation.
     * @request POST:/horse/change-owner/without-confirmation
     * @secure
     */
    withoutConfirmation: (
      data: HorseChangeOwnerRequest,
      params: RequestParams = {},
    ) =>
      this.request<ActionResult, ActionResult | ProblemDetails>({
        path: `/horse/change-owner/without-confirmation`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags HorseChangeOwner
     * @name AcceptChangeOwner
     * @request PUT:/horse/change-owner/accept
     * @secure
     */
    acceptChangeOwner: (
      data: HorseTransferAcceptCommand,
      params: RequestParams = {},
    ) =>
      this.request<ActionResult, ProblemDetails>({
        path: `/horse/change-owner/accept`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags HorseChangeOwner
     * @name RejectChangeOwner
     * @request PUT:/horse/change-owner/reject
     * @secure
     */
    rejectChangeOwner: (
      data: HorseTransferRejectCommand,
      params: RequestParams = {},
    ) =>
      this.request<ActionResult, ProblemDetails>({
        path: `/horse/change-owner/reject`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags HorseClaim
     * @name Claim
     * @request POST:/horse/claim
     * @secure
     */
    claim: (data: HorseClaimRequest, params: RequestParams = {}) =>
      this.request<ClaimHistoryResponse, ClaimHistoryResponse | ProblemDetails>(
        {
          path: `/horse/claim`,
          method: "POST",
          body: data,
          secure: true,
          type: ContentType.Json,
          format: "json",
          ...params,
        },
      ),

    /**
     * No description
     *
     * @tags HorseClaim
     * @name AcknowledgesReceipt
     * @request POST:/horse/claim/acknowledge-receipts
     * @secure
     */
    acknowledgesReceipt: (
      data: HorseClaimReceiptRequest,
      params: RequestParams = {},
    ) =>
      this.request<ActionResult, ActionResult | ProblemDetails>({
        path: `/horse/claim/acknowledge-receipts`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags HorseClaim
     * @name ReceiptsProvided
     * @request POST:/horse/claim/receipts-provided
     * @secure
     */
    receiptsProvided: (
      data: HorseClaimReceiptRequest,
      params: RequestParams = {},
    ) =>
      this.request<ActionResult, ActionResult | ProblemDetails>({
        path: `/horse/claim/receipts-provided`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags HorseClaim
     * @name Cancel
     * @request POST:/horse/claim/cancel
     * @secure
     */
    cancel: (data: HorseClaimCancelRequest, params: RequestParams = {}) =>
      this.request<ActionResult, ActionResult | ProblemDetails>({
        path: `/horse/claim/cancel`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags HorseClaim
     * @name CancelClaimForCp
     * @request POST:/horse/claim/cancel-claim-cp
     * @deprecated
     * @secure
     */
    cancelClaimForCp: (
      data: HorseClaimCancelRequest,
      params: RequestParams = {},
    ) =>
      this.request<ActionResult, ActionResult | ProblemDetails>({
        path: `/horse/claim/cancel-claim-cp`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags HorseClaim
     * @name CancelAndCreate
     * @request POST:/horse/claim/cancel-and-create
     * @secure
     */
    cancelAndCreate: (
      data: CancelAndCreateClaimRequest,
      params: RequestParams = {},
    ) =>
      this.request<ActionResult, ActionResult | ProblemDetails>({
        path: `/horse/claim/cancel-and-create`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags HorseClaim
     * @name CanRequestMedicalCommand
     * @request POST:/horse/claim/can-request-medical-records
     * @secure
     */
    canRequestMedicalCommand: (
      data: HorseClaimCanMedicalRequest,
      params: RequestParams = {},
    ) =>
      this.request<
        HorseClaimCanMedicalRequest,
        HorseClaimCanMedicalRequest | ProblemDetails
      >({
        path: `/horse/claim/can-request-medical-records`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags HorseClaim
     * @name RequestMedicalCommand
     * @request POST:/horse/claim/request-medical-records
     * @secure
     */
    requestMedicalCommand: (
      data: HorseClaimCanMedicalRequest,
      params: RequestParams = {},
    ) =>
      this.request<ActionResult, ActionResult | ProblemDetails>({
        path: `/horse/claim/request-medical-records`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags HorseClaim
     * @name GetHorseById
     * @summary Get claim history by horse id
     * @request GET:/horse/claim/{hisaHorseId}
     * @secure
     */
    getHorseById: (
      hisaHorseId: string,
      query?: {
        sortBy?: string;
        /** @format int32 */
        sortDirection?: number;
        isAscSort?: boolean;
        /** @format int32 */
        page?: number;
        /** @format int32 */
        pageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<ClaimHistoryResponse[], ProblemDetails>({
        path: `/horse/claim/${hisaHorseId}`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags HorseClaim
     * @name GetHorseByName
     * @request GET:/horse/claim/search-horse-name/{horseName}
     * @secure
     */
    getHorseByName: (
      horseName: string,
      query?: {
        sortBy?: string;
        /** @format int32 */
        sortDirection?: number;
        isAscSort?: boolean;
        /** @format int32 */
        page?: number;
        /** @format int32 */
        pageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<ClaimHistorySearchDto[], ProblemDetails>({
        path: `/horse/claim/search-horse-name/${horseName}`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags HorseClaim
     * @name GetSearch2
     * @request GET:/horse/claim/{locationId}/recently-claimed
     * @originalName getSearch
     * @duplicate
     * @secure
     */
    getSearch2: (locationId: string, params: RequestParams = {}) =>
      this.request<ClaimedHorseModel[], ProblemDetails>({
        path: `/horse/claim/${locationId}/recently-claimed`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags HorseClaim
     * @name ClaimRaceSummary
     * @request GET:/horse/claim/{locationId}/claim-race-summary
     * @secure
     */
    claimRaceSummary: (
      locationId: string,
      query?: {
        /** @format date */
        startDate?: string;
        /** @format date */
        endDate?: string;
        sortBy?: string;
        /** @format int32 */
        sortDirection?: number;
        isAscSort?: boolean;
        /** @format int32 */
        page?: number;
        /** @format int32 */
        pageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<ClaimRaceSummaryModel[], ProblemDetails>({
        path: `/horse/claim/${locationId}/claim-race-summary`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags HorseClaim
     * @name RaceDayView
     * @request GET:/horse/claim/{locationId}/race-day-view
     * @secure
     */
    raceDayView: (
      locationId: string,
      query?: {
        /** @format date */
        date?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<RaceDayViewModel[], ProblemDetails>({
        path: `/horse/claim/${locationId}/race-day-view`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags HorseClaim
     * @name MakeDailyRacesCompleted
     * @request POST:/horse/claim/make-race-as-completed
     * @secure
     */
    makeDailyRacesCompleted: (
      data: CompletedRaceModel,
      params: RequestParams = {},
    ) =>
      this.request<ActionResult, ActionResult | ProblemDetails>({
        path: `/horse/claim/make-race-as-completed`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags HorseClaim
     * @name RaceView
     * @request GET:/horse/claim/{locationId}/race-view
     * @secure
     */
    raceView: (
      locationId: string,
      query?: {
        /** @format date */
        date?: string;
        /** @format int32 */
        raceNumber?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<RaceViewModel[], ProblemDetails>({
        path: `/horse/claim/${locationId}/race-view`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags HorseClaim
     * @name GetClaimedHorses
     * @request GET:/horse/claim/{locationId}/horses-claimed/all
     * @secure
     */
    getClaimedHorses: (
      locationId: string,
      query?: {
        sortBy?: string;
        /** @format int32 */
        sortDirection?: number;
        isAscSort?: boolean;
        /** @format int32 */
        page?: number;
        /** @format int32 */
        pageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<ClaimHistorySearchDto[], ProblemDetails>({
        path: `/horse/claim/${locationId}/horses-claimed/all`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags HorseClaim
     * @name SaveHorsesToClaim
     * @request POST:/horse/claim/horses-to-claim
     * @secure
     */
    saveHorsesToClaim: (
      data: HorsesToClaimRequest,
      params: RequestParams = {},
    ) =>
      this.request<ActionResult, ActionResult | ProblemDetails>({
        path: `/horse/claim/horses-to-claim`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags HorseClaim
     * @name GetCompletedRace
     * @request GET:/horse/claim/completed-daily-race
     * @secure
     */
    getCompletedRace: (
      query: {
        /** @minLength 1 */
        trackId: string;
        /**
         * @format date
         * @minLength 1
         */
        claimDate: string;
        raceNumbers: number[];
      },
      params: RequestParams = {},
    ) =>
      this.request<ClaimHistorySearchDto, ProblemDetails>({
        path: `/horse/claim/completed-daily-race`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags HorseClaim
     * @name ModifyCompletedRace
     * @request PUT:/horse/claim/completed-daily-race/modify
     * @secure
     */
    modifyCompletedRace: (
      data: CompletedRaceRequest,
      params: RequestParams = {},
    ) =>
      this.request<ActionResult, ProblemDetails>({
        path: `/horse/claim/completed-daily-race/modify`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags HorseClaim
     * @name DeleteCompletedRace
     * @request DELETE:/horse/claim/{claimHistoryId}/completed-daily-race/delete
     * @secure
     */
    deleteCompletedRace: (claimHistoryId: string, params: RequestParams = {}) =>
      this.request<ActionResult, ProblemDetails>({
        path: `/horse/claim/${claimHistoryId}/completed-daily-race/delete`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags HorseClaim
     * @name BatchGet2
     * @request PUT:/horse/claim/batch-get
     * @originalName batchGet
     * @duplicate
     * @secure
     */
    batchGet2: (data: string[], params: RequestParams = {}) =>
      this.request<ClaimHistoryResponse[], ProblemDetails>({
        path: `/horse/claim/batch-get`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags HorseClaim
     * @name BatchUpdate2
     * @request PUT:/horse/claim/batch-update
     * @originalName batchUpdate
     * @duplicate
     * @secure
     */
    batchUpdate2: (
      data: HorseClaimBatchRequest[],
      params: RequestParams = {},
    ) =>
      this.request<ActionResult, ProblemDetails>({
        path: `/horse/claim/batch-update`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags HorseClaim
     * @name GetByClaimHistoryId
     * @request GET:/horse/claim/by/{claimHistoryId}
     * @secure
     */
    getByClaimHistoryId: (claimHistoryId: string, params: RequestParams = {}) =>
      this.request<ClaimHistoryResponse, ProblemDetails>({
        path: `/horse/claim/by/${claimHistoryId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags HorseClaim
     * @name GetMissingClaims
     * @request GET:/horse/claim/missing
     * @secure
     */
    getMissingClaims: (
      query?: {
        locationId?: string;
        searchText?: string;
        sortBy?: string;
        /** @format int32 */
        sortDirection?: number;
        isAscSort?: boolean;
        /** @format int32 */
        page?: number;
        /** @format int32 */
        pageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<TjcClaimHistoryResponse[], ProblemDetails>({
        path: `/horse/claim/missing`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags HorseGetOffVetsList
     * @name Request
     * @request POST:/horse/get-off-vets-list
     * @secure
     */
    request: (data: HorseGetOffVetsListRequest, params: RequestParams = {}) =>
      this.request<ActionResult, ActionResult | ProblemDetails>({
        path: `/horse/get-off-vets-list`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags HorseGetOffVetsList
     * @name PassedJog
     * @request PUT:/horse/get-off-vets-list/passed-jog
     * @secure
     */
    passedJog: (
      data: HorseGetOffVetsListPassedJogCommand,
      params: RequestParams = {},
    ) =>
      this.request<ActionResult, ProblemDetails>({
        path: `/horse/get-off-vets-list/passed-jog`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags HorseGetOffVetsList
     * @name RequestRegulatoryVetSignoff
     * @request PUT:/horse/get-off-vets-list/request-regulatory-vet-signoff
     * @secure
     */
    requestRegulatoryVetSignoff: (
      data: HorseGetOffVetsListReqRegulatoryVetCommand,
      params: RequestParams = {},
    ) =>
      this.request<ActionResult, ProblemDetails>({
        path: `/horse/get-off-vets-list/request-regulatory-vet-signoff`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags HorseGetOffVetsList
     * @name DoNotRequestRegulatoryVetSignoff
     * @request PUT:/horse/get-off-vets-list/do-not-request-regulatory-vet-signoff
     * @secure
     */
    doNotRequestRegulatoryVetSignoff: (
      data: HorseGetOffVetsListDoNotReqRegulatoryVetCommand,
      params: RequestParams = {},
    ) =>
      this.request<ActionResult, ProblemDetails>({
        path: `/horse/get-off-vets-list/do-not-request-regulatory-vet-signoff`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags HorseGetOffVetsList
     * @name FailedJog
     * @request PUT:/horse/get-off-vets-list/failed-jog
     * @secure
     */
    failedJog: (
      data: HorseGetOffVetsListFailedJogCommand,
      params: RequestParams = {},
    ) =>
      this.request<ActionResult, ProblemDetails>({
        path: `/horse/get-off-vets-list/failed-jog`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags HorseLipchipTransport
     * @name GetHorseArrivals
     * @request GET:/horse/{horseId}/lipchip/transport/arrivals
     * @secure
     */
    getHorseArrivals: (horseId: string, params: RequestParams = {}) =>
      this.request<LipchipArrivalResponse[], ProblemDetails>({
        path: `/horse/${horseId}/lipchip/transport/arrivals`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags HorseLipchipTransport
     * @name GetHorsePickups
     * @request GET:/horse/{horseId}/lipchip/transport/pickups
     * @secure
     */
    getHorsePickups: (horseId: string, params: RequestParams = {}) =>
      this.request<LipchipPickupResponse[], ProblemDetails>({
        path: `/horse/${horseId}/lipchip/transport/pickups`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags HorseLipchipTransport
     * @name GetHorseDrives
     * @request GET:/horse/{horseId}/lipchip/transport/drives
     * @secure
     */
    getHorseDrives: (horseId: string, params: RequestParams = {}) =>
      this.request<LipchipDriveUpdateResponse[], ProblemDetails>({
        path: `/horse/${horseId}/lipchip/transport/drives`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags HorseLipchipTransport
     * @name GetHorseArrival
     * @request GET:/horse/{horseId}/lipchip/transport/arrivals/{moveId}
     * @secure
     */
    getHorseArrival: (
      horseId: string,
      moveId: string,
      params: RequestParams = {},
    ) =>
      this.request<LipchipArrivalResponse, ProblemDetails>({
        path: `/horse/${horseId}/lipchip/transport/arrivals/${moveId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags HorseLipchipTransport
     * @name GetHorsePickup
     * @request GET:/horse/{horseId}/lipchip/transport/pickups/{moveId}
     * @secure
     */
    getHorsePickup: (
      horseId: string,
      moveId: string,
      params: RequestParams = {},
    ) =>
      this.request<LipchipPickupResponse, ProblemDetails>({
        path: `/horse/${horseId}/lipchip/transport/pickups/${moveId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags HorseLipchipTransport
     * @name GetHorseDrives2
     * @request GET:/horse/{horseId}/lipchip/transport/drives/{moveId}
     * @originalName getHorseDrives
     * @duplicate
     * @secure
     */
    getHorseDrives2: (
      horseId: string,
      moveId: string,
      params: RequestParams = {},
    ) =>
      this.request<LipchipDriveUpdateResponse[], ProblemDetails>({
        path: `/horse/${horseId}/lipchip/transport/drives/${moveId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags HorseRetire
     * @name BatchRetire
     * @summary Initiates the retirement process for multiple horses.
     * @request POST:/horse/retire/start-retirements
     * @secure
     */
    batchRetire: (data: HorseBatchRetireRequest, params: RequestParams = {}) =>
      this.request<
        HorseMedicalResponse[],
        HorseMedicalResponse[] | ProblemDetails
      >({
        path: `/horse/retire/start-retirements`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags HorseRetire
     * @name ReportDeath
     * @summary Reports the death of a horse.
     * @request POST:/horse/retire/report-death
     * @secure
     */
    reportDeath: (data: HorseDeathRequest, params: RequestParams = {}) =>
      this.request<HorseMedicalResponse, HorseMedicalResponse | ProblemDetails>(
        {
          path: `/horse/retire/report-death`,
          method: "POST",
          body: data,
          secure: true,
          type: ContentType.Json,
          format: "json",
          ...params,
        },
      ),

    /**
     * No description
     *
     * @tags HorseRetire
     * @name MistakenRetirementIdAsync
     * @summary Generates a new identifier for a mistaken retirement entry.
     * @request POST:/horse/retire/new-mistaken-retirement
     * @secure
     */
    mistakenRetirementIdAsync: (params: RequestParams = {}) =>
      this.request<MistakenRetirement, MistakenRetirement | ProblemDetails>({
        path: `/horse/retire/new-mistaken-retirement`,
        method: "POST",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags HorseRetire
     * @name AddDocument2
     * @summary Adds a new document associated with a horse's retirement process.
     * @request POST:/horse/retire/document/add
     * @originalName addDocument
     * @duplicate
     * @secure
     */
    addDocument2: (
      data: HorseRetireDocumentUploadRequest,
      params: RequestParams = {},
    ) =>
      this.request<
        PresignedPostResponse,
        PresignedPostResponse | ProblemDetails
      >({
        path: `/horse/retire/document/add`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags HorseRetire
     * @name SearchRetirementDocuments
     * @summary Searches documents related to horse retirements.
     * @request GET:/horse/retire/document/all
     * @secure
     */
    searchRetirementDocuments: (
      query?: {
        persons?: string[];
        locations?: string[];
        searchText?: string;
        /** @format date-time */
        startDate?: string;
        /** @format date-time */
        endDate?: string;
        sortBy?: string;
        /** @format int32 */
        sortDirection?: number;
        isAscSort?: boolean;
        /** @format int32 */
        page?: number;
        /** @format int32 */
        pageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<DocumentFileResponse[], ProblemDetails>({
        path: `/horse/retire/document/all`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags HorseRtrReports
     * @name GetHorseReports
     * @request GET:/horse/{horseId}/reports/ready-to-run
     * @secure
     */
    getHorseReports: (
      horseId: string,
      query?: {
        sortBy?: string;
        /** @format int32 */
        sortDirection?: number;
        isAscSort?: boolean;
        /** @format int32 */
        page?: number;
        /** @format int32 */
        pageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<SearchResponseRtrReportResponse, ProblemDetails>({
        path: `/horse/${horseId}/reports/ready-to-run`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags HorseShare
     * @name Share
     * @request POST:/horse/share
     * @secure
     */
    share: (data: HorseShareRequst, params: RequestParams = {}) =>
      this.request<ActionResult, ActionResult | ProblemDetails>({
        path: `/horse/share`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags HorseShare
     * @name AcceptShare
     * @request PUT:/horse/share/accept
     * @secure
     */
    acceptShare: (data: HorseShareAcceptRequest, params: RequestParams = {}) =>
      this.request<ActionResult, ProblemDetails>({
        path: `/horse/share/accept`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags HorseShare
     * @name RejectShare
     * @request PUT:/horse/share/reject
     * @secure
     */
    rejectShare: (data: HorseShareRejectRequest, params: RequestParams = {}) =>
      this.request<ActionResult, ProblemDetails>({
        path: `/horse/share/reject`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags HorseShare
     * @name UnShare
     * @request POST:/horse/share/unshare
     * @secure
     */
    unShare: (data: HorseUnshareRequest, params: RequestParams = {}) =>
      this.request<ActionResult, ActionResult | ProblemDetails>({
        path: `/horse/share/unshare`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags HorseShockwave
     * @name Request2
     * @request POST:/horse/shockwave/request
     * @originalName request
     * @duplicate
     * @secure
     */
    request2: (data: HorseShockwaveRequest, params: RequestParams = {}) =>
      this.request<ActionResult, ActionResult | ProblemDetails>({
        path: `/horse/shockwave/request`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags HorseShockwave
     * @name RequestAccept
     * @request POST:/horse/shockwave/accept
     * @secure
     */
    requestAccept: (
      data: HorseShockwaveAcceptRejectRequest,
      params: RequestParams = {},
    ) =>
      this.request<ActionResult, ActionResult | ProblemDetails>({
        path: `/horse/shockwave/accept`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags HorseShockwave
     * @name RequestReject
     * @request POST:/horse/shockwave/reject
     * @secure
     */
    requestReject: (
      data: HorseShockwaveAcceptRejectRequest,
      params: RequestParams = {},
    ) =>
      this.request<ActionResult, ActionResult | ProblemDetails>({
        path: `/horse/shockwave/reject`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags HorseShockwave
     * @name CanCancelRequest
     * @request POST:/horse/shockwave/can-cancel-request
     * @secure
     */
    canCancelRequest: (
      data: HorseShockwaveBaseRequest,
      params: RequestParams = {},
    ) =>
      this.request<
        HorseShockwaveBaseRequest,
        HorseShockwaveBaseRequest | ProblemDetails
      >({
        path: `/horse/shockwave/can-cancel-request`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags HorseShockwave
     * @name CancelRequest
     * @request POST:/horse/shockwave/cancel-request
     * @secure
     */
    cancelRequest: (data: HorseShockwaveRequest, params: RequestParams = {}) =>
      this.request<ActionResult, ActionResult | ProblemDetails>({
        path: `/horse/shockwave/cancel-request`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags HorseTakeback
     * @name Takeback
     * @request POST:/horse/takeback
     * @secure
     */
    takeback: (data: HorseTakebackCommand, params: RequestParams = {}) =>
      this.request<ActionResult, ActionResult | ProblemDetails>({
        path: `/horse/takeback`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags HorseTransfer
     * @name Transfer
     * @summary Transfers ownership of a horse to another person.
     * @request POST:/horse/transfer
     * @secure
     */
    transfer: (data: HorseTransferRequest, params: RequestParams = {}) =>
      this.request<ActionResult, ActionResult | ProblemDetails>({
        path: `/horse/transfer`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags HorseTransfer
     * @name TransferWithoutConfirmation
     * @request POST:/horse/transfer/without-confirmation
     * @secure
     */
    transferWithoutConfirmation: (
      data: HorseTransferRequest,
      params: RequestParams = {},
    ) =>
      this.request<ActionResult, ActionResult | ProblemDetails>({
        path: `/horse/transfer/without-confirmation`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags HorseTransfer
     * @name AcceptTransfer
     * @request PUT:/horse/transfer/accept
     * @secure
     */
    acceptTransfer: (
      data: HorseTransferAcceptCommand,
      params: RequestParams = {},
    ) =>
      this.request<ActionResult, ProblemDetails>({
        path: `/horse/transfer/accept`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags HorseTransfer
     * @name RejectTransfer
     * @request PUT:/horse/transfer/reject
     * @secure
     */
    rejectTransfer: (
      data: HorseTransferRejectCommand,
      params: RequestParams = {},
    ) =>
      this.request<ActionResult, ProblemDetails>({
        path: `/horse/transfer/reject`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags HorseTransfer
     * @name TransferAssignOwnerTrainer
     * @summary Assign horse on new owner and trainer
     * @request POST:/horse/transfer/{horseId}/assign-owner-or-trainer
     * @secure
     */
    transferAssignOwnerTrainer: (
      horseId: string,
      data: HorseTransferAssignOwnerTrainerRequest,
      params: RequestParams = {},
    ) =>
      this.request<ActionResult, ActionResult | ProblemDetails>({
        path: `/horse/transfer/${horseId}/assign-owner-or-trainer`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags HorseTransfer
     * @name GiveHorseBackToDo
     * @request POST:/horse/transfer/{horseId}/give-back-to-owner
     * @secure
     */
    giveHorseBackToDo: (
      horseId: string,
      data: HorseTransferBackToOwnerCommand,
      params: RequestParams = {},
    ) =>
      this.request<ActionResult, ActionResult | ProblemDetails>({
        path: `/horse/transfer/${horseId}/give-back-to-owner`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags HorseTransfer
     * @name RequestToBecomeRp
     * @request POST:/horse/transfer/{horseId}/request-to-become-responsible-person
     * @secure
     */
    requestToBecomeRp: (
      horseId: string,
      data: RequstToBecomeRPCommand,
      params: RequestParams = {},
    ) =>
      this.request<ActionResult, ActionResult | ProblemDetails>({
        path: `/horse/transfer/${horseId}/request-to-become-responsible-person`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags HorseTransfer
     * @name AcceptToBecomeRp
     * @request PUT:/horse/transfer/{horseId}/request-to-become-responsible-person/accept
     * @secure
     */
    acceptToBecomeRp: (
      horseId: string,
      data: RequestToBecomeRPAcceptCommand,
      params: RequestParams = {},
    ) =>
      this.request<ActionResult, ProblemDetails>({
        path: `/horse/transfer/${horseId}/request-to-become-responsible-person/accept`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags HorseTransfer
     * @name RejectToBecomeRp
     * @request PUT:/horse/transfer/{horseId}/request-to-become-responsible-person/reject
     * @secure
     */
    rejectToBecomeRp: (
      horseId: string,
      data: RequstToBecomeRPRejectCommand,
      params: RequestParams = {},
    ) =>
      this.request<ActionResult, ProblemDetails>({
        path: `/horse/transfer/${horseId}/request-to-become-responsible-person/reject`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  horsemedical = {
    /**
     * No description
     *
     * @tags HorseMedical
     * @name GetAssortedFieldsAsync
     * @summary Retrieves a list of assorted fields for autocomplete functionality.
     * @request GET:/horsemedical/autocomplete/fields
     * @secure
     */
    getAssortedFieldsAsync: (params: RequestParams = {}) =>
      this.request<string[], ProblemDetails>({
        path: `/horsemedical/autocomplete/fields`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags HorseMedical
     * @name GetAssortedFieldAsync
     * @summary Retrieves autocomplete suggestions for a specified field and optional search text.
     * @request GET:/horsemedical/autocomplete/{field}/{searchText}
     * @secure
     */
    getAssortedFieldAsync: (
      field: string,
      searchText: string,
      params: RequestParams = {},
    ) =>
      this.request<AssortedAutocompleteDto[], ProblemDetails>({
        path: `/horsemedical/autocomplete/${field}/${searchText}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags HorseMedical
     * @name GetById
     * @summary Retrieves a horse medical record by its ID.
     * @request GET:/horsemedical/{horseMedicalId}
     * @secure
     */
    getById: (horseMedicalId: string, params: RequestParams = {}) =>
      this.request<HorseMedicalResponse, ProblemDetails>({
        path: `/horsemedical/${horseMedicalId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags HorseMedical
     * @name Patch
     * @summary Updates specific details of a horse medical record.
     * @request PATCH:/horsemedical/{horseMedicalId}
     * @secure
     */
    patch: (
      horseMedicalId: string,
      data: HorseMedicalPatchRequest,
      params: RequestParams = {},
    ) =>
      this.request<HorseMedicalResponse, ProblemDetails>({
        path: `/horsemedical/${horseMedicalId}`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags HorseMedical
     * @name Update
     * @summary Fully updates a horse medical record.
     * @request PUT:/horsemedical/{horseMedicalId}
     * @secure
     */
    update: (
      horseMedicalId: string,
      data: HorseMedicalUpdateRequest,
      params: RequestParams = {},
    ) =>
      this.request<HorseMedicalResponse, ProblemDetails>({
        path: `/horsemedical/${horseMedicalId}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags HorseMedical
     * @name GetPrivileges
     * @summary Retrieves horse medical privileges for the provided IDs.
     * @request POST:/horsemedical/batch/privileges
     * @secure
     */
    getPrivileges: (
      data: HorseMedicalPrivilagesRequest,
      params: RequestParams = {},
    ) =>
      this.request<
        HorseMedicalPrivilegesResponse,
        HorseMedicalPrivilegesResponse | ProblemDetails
      >({
        path: `/horsemedical/batch/privileges`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags HorseMedical
     * @name BatchGet
     * @summary Retrieves horse medical records in batch based on provided IDs.
     * @request PUT:/horsemedical/batch-get
     * @secure
     */
    batchGet: (data: string[], params: RequestParams = {}) =>
      this.request<HorseMedicalResponse[], ProblemDetails>({
        path: `/horsemedical/batch-get`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags HorseMedical
     * @name CreateMlRequest
     * @summary Processes a machine learning request related to horse medical data.
     * @request POST:/horsemedical/ml-request
     * @secure
     */
    createMlRequest: (
      data: MlHorseMedicalRequest,
      params: RequestParams = {},
    ) =>
      this.request<MlResponse, MlResponse | ProblemDetails>({
        path: `/horsemedical/ml-request`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags HorseMedical
     * @name BatchUpdate
     * @summary Updates multiple horse medical records in batch.
     * @request PUT:/horsemedical/batch-update
     * @secure
     */
    batchUpdate: (
      data: HorseMedicalBatchUpdateRequest[],
      params: RequestParams = {},
    ) =>
      this.request<ActionResult, ProblemDetails>({
        path: `/horsemedical/batch-update`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags HorseMedical
     * @name Add
     * @summary Adds a new horse medical record.
     * @request POST:/horsemedical
     * @secure
     */
    add: (data: HorseMedicalRequest, params: RequestParams = {}) =>
      this.request<HorseMedicalResponse, HorseMedicalResponse | ProblemDetails>(
        {
          path: `/horsemedical`,
          method: "POST",
          body: data,
          secure: true,
          type: ContentType.Json,
          format: "json",
          ...params,
        },
      ),

    /**
     * No description
     *
     * @tags HorseMedical
     * @name AddWithNotification
     * @summary Adds a horse medical record with notifications.
     * @request POST:/horsemedical/with-notification
     * @secure
     */
    addWithNotification: (
      data: HorseMedicalRequest,
      params: RequestParams = {},
    ) =>
      this.request<HorseMedicalResponse, HorseMedicalResponse | ProblemDetails>(
        {
          path: `/horsemedical/with-notification`,
          method: "POST",
          body: data,
          secure: true,
          type: ContentType.Json,
          format: "json",
          ...params,
        },
      ),

    /**
     * No description
     *
     * @tags HorseMedical
     * @name DeleteWithReason
     * @summary Deletes a horse medical record with a specified reason.
     * @request DELETE:/horsemedical/{horseMedicalId}/delete-reason
     * @secure
     */
    deleteWithReason: (
      horseMedicalId: string,
      data: string,
      params: RequestParams = {},
    ) =>
      this.request<ActionResult, ProblemDetails>({
        path: `/horsemedical/${horseMedicalId}/delete-reason`,
        method: "DELETE",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags HorseMedical
     * @name GiveVaccine
     * @summary Searches and resolves a recognized vaccine name for a horse medical entry.
     * @request POST:/horsemedical/search/vaccine
     * @secure
     */
    giveVaccine: (
      query?: {
        vaccineName?: string;
        /** @format date */
        entryDate?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        HorseMedicalRecognizedName[],
        HorseMedicalRecognizedName[] | ProblemDetails
      >({
        path: `/horsemedical/search/vaccine`,
        method: "POST",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags HorseMedical
     * @name AddDocument
     * @summary Adds a document to the specified horse medical record.
     * @request POST:/horsemedical/{horseMedicalId}/document/add
     * @secure
     */
    addDocument: (
      horseMedicalId: string,
      data: {
        /** The name of the file to be added. */
        fileName: string;
        /**
         * Optional person ID of the individual submitting the document.
         * @default ""
         */
        personId?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        PresignedPostResponse,
        PresignedPostResponse | ProblemDetails
      >({
        path: `/horsemedical/${horseMedicalId}/document/add`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags HorseMedical
     * @name GetAllDocuments
     * @summary Retrieves all documents associated with the specified horse medical record.
     * @request GET:/horsemedical/{horseMedicalId}/document/all
     * @secure
     */
    getAllDocuments: (horseMedicalId: string, params: RequestParams = {}) =>
      this.request<DocumentFileResponse[], ProblemDetails>({
        path: `/horsemedical/${horseMedicalId}/document/all`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags HorseMedical
     * @name GetBatchAllDocuments
     * @summary Retrieves all documents for a batch of specified horse medical records.
     * @request POST:/horsemedical/document/all
     * @secure
     */
    getBatchAllDocuments: (data: string[], params: RequestParams = {}) =>
      this.request<
        DocumentFileListResponse[],
        DocumentFileListResponse[] | ProblemDetails
      >({
        path: `/horsemedical/document/all`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags HorseMedical
     * @name DeleteDocument
     * @summary Deletes a specific document associated with the specified horse medical record.
     * @request DELETE:/horsemedical/{horseMedicalId}/document/{documentId}/delete
     * @secure
     */
    deleteDocument: (
      horseMedicalId: string,
      documentId: string,
      params: RequestParams = {},
    ) =>
      this.request<Task, ProblemDetails>({
        path: `/horsemedical/${horseMedicalId}/document/${documentId}/delete`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags HorseMedical
     * @name GetByHorseId
     * @summary Search for horse medical records by horse Id
     * @request GET:/horsemedical/horse/{hisaHorseId}
     * @deprecated
     * @secure
     */
    getByHorseId: (
      hisaHorseId: string,
      query?: {
        includeDeleted?: boolean;
        searchText?: string;
        /** @format date-time */
        startDate?: string;
        /** @format date-time */
        endDate?: string;
        sortBy?: string;
        /** @format int32 */
        sortDirection?: number;
        isAscSort?: boolean;
        /** @format int32 */
        page?: number;
        /** @format int32 */
        pageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<HorseMedicalResponse[], ProblemDetails>({
        path: `/horsemedical/horse/${hisaHorseId}`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags HorseMedical
     * @name Search
     * @summary Search for horse medical records by search text and pagination
     * @request GET:/horsemedical/search/{searchText}
     * @deprecated
     * @secure
     */
    search: (
      searchText: string,
      query?: {
        sortBy?: string;
        /** @format int32 */
        sortDirection?: number;
        isAscSort?: boolean;
        /** @format int32 */
        page?: number;
        /** @format int32 */
        pageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<HorseMedicalResponse[], ProblemDetails>({
        path: `/horsemedical/search/${searchText}`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags HorseMedical
     * @name GetMedicalRecordsByDateRange
     * @summary Search for horse medical records by date range
     * @request GET:/horsemedical/search/{startDate}/{endDate}/{field}
     * @deprecated
     * @secure
     */
    getMedicalRecordsByDateRange: (
      startDate: string,
      endDate: string,
      field: string,
      query?: {
        sortBy?: string;
        /** @format int32 */
        sortDirection?: number;
        isAscSort?: boolean;
        /** @format int32 */
        page?: number;
        /** @format int32 */
        pageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<HorseMedicalResponse[], ProblemDetails>({
        path: `/horsemedical/search/${startDate}/${endDate}/${field}`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags HorseMedical
     * @name GetEnforcedByHorseAndDateRange
     * @summary Search for enforced horse medical records by horse and date range
     * @request GET:/horsemedical/search/all
     * @deprecated
     * @secure
     */
    getEnforcedByHorseAndDateRange: (
      query?: {
        recTypes?: HorseMedicalRecType[] | null;
        excludeRecTypes?: HorseMedicalRecType[] | null;
        /** @maxLength 100 */
        text?: string | null;
        horseIds?: string[] | null;
        showDeleted?: boolean;
        /** @format date-time */
        startDate?: string | null;
        /** @format date-time */
        endDate?: string | null;
        sortBy?: string | null;
        /** @format int32 */
        sortDirection?: number;
        isAscSort?: boolean;
        /** @format int32 */
        page?: number;
        /** @format int32 */
        pageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<HorseMedicalResponse[], ProblemDetails>({
        path: `/horsemedical/search/all`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags HorseMedical
     * @name GetRecordsByAttendingVetAsync
     * @summary Search for Horse Medical records by attending veterenatian
     * @request GET:/horsemedical/created-by/{personId}
     * @deprecated
     * @secure
     */
    getRecordsByAttendingVetAsync: (
      personId: string,
      query?: {
        /** @format date-time */
        startDate?: string;
        /** @format date-time */
        endDate?: string;
        sortBy?: string;
        /** @format int32 */
        sortDirection?: number;
        isAscSort?: boolean;
        /** @format int32 */
        page?: number;
        /** @format int32 */
        pageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<HorseMedicalResponse[], ProblemDetails>({
        path: `/horsemedical/created-by/${personId}`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags HorseMedical
     * @name GetDuplicatesByCondition
     * @summary Search for duplicated medical records by condition
     * @request POST:/horsemedical/get-duplicates-by-condition
     * @secure
     */
    getDuplicatesByCondition: (
      data: HorseMedicalSearchDuplicatesRequest,
      params: RequestParams = {},
    ) =>
      this.request<
        HorseMedicalResponse[],
        HorseMedicalResponse[] | ProblemDetails
      >({
        path: `/horsemedical/get-duplicates-by-condition`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags HorseMedical
     * @name FindMedicalRecordFilteredByCreatedDate
     * @summary Search for medical record filtered By created date
     * @request GET:/horsemedical/activity/created
     * @secure
     */
    findMedicalRecordFilteredByCreatedDate: (
      query: {
        /** @format date-time */
        startDate: string;
        /** @format date-time */
        endDate: string;
        sortBy?: string | null;
        /** @format int32 */
        sortDirection?: number;
        isAscSort?: boolean;
        /** @format int32 */
        page?: number;
        /** @format int32 */
        pageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<HorseMedicalResponse[], ProblemDetails>({
        path: `/horsemedical/activity/created`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags HorseMedical
     * @name FindMedicalRecordFilteredByUpdateDate
     * @summary Search for Medical Record Filtered By Update Date
     * @request GET:/horsemedical/activity/updated
     * @secure
     */
    findMedicalRecordFilteredByUpdateDate: (
      query: {
        /** @format date-time */
        startDate: string;
        /** @format date-time */
        endDate: string;
        sortBy?: string | null;
        /** @format int32 */
        sortDirection?: number;
        isAscSort?: boolean;
        /** @format int32 */
        page?: number;
        /** @format int32 */
        pageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<HorseMedicalResponse[], ProblemDetails>({
        path: `/horsemedical/activity/updated`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags HorseMedical
     * @name FindIncompleteMedicalRecordFilteredByConditionAsync
     * @summary Search for incomplete medical record filtered by condition
     * @request GET:/horsemedical/search/incomplete
     * @secure
     */
    findIncompleteMedicalRecordFilteredByConditionAsync: (
      query?: {
        recTypes?: HorseMedicalRecType[] | null;
        excludeRecTypes?: HorseMedicalRecType[] | null;
        /** @maxLength 100 */
        text?: string | null;
        horseIds?: string[] | null;
        showDeleted?: boolean;
        /** @format date-time */
        startDate?: string | null;
        /** @format date-time */
        endDate?: string | null;
        sortBy?: string | null;
        /** @format int32 */
        sortDirection?: number;
        isAscSort?: boolean;
        /** @format int32 */
        page?: number;
        /** @format int32 */
        pageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<HorseMedicalResponse[], ProblemDetails>({
        path: `/horsemedical/search/incomplete`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags HorseMedical
     * @name FindMedicalRaceInspection
     * @summary Search for Horse Medical by Race ispection
     * @request GET:/horsemedical/race-inspection/{locationId}/{date}/{race}
     * @deprecated
     * @secure
     */
    findMedicalRaceInspection: (
      locationId: string,
      date: string,
      race: string,
      query?: {
        sortBy?: string;
        /** @format int32 */
        sortDirection?: number;
        isAscSort?: boolean;
        /** @format int32 */
        page?: number;
        /** @format int32 */
        pageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<HorseMedicalResponse[], ProblemDetails>({
        path: `/horsemedical/race-inspection/${locationId}/${date}/${race}`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags HorseMedical
     * @name GetByInspection
     * @summary Search for Horse Medical by Inspection
     * @request GET:/horsemedical/search/inspection
     * @deprecated
     * @secure
     */
    getByInspection: (
      query: {
        /** @format date-time */
        startDate: string;
        /** @format date-time */
        endDate: string;
        sortBy?: string | null;
        /** @format int32 */
        sortDirection?: number;
        isAscSort?: boolean;
        /** @format int32 */
        page?: number;
        /** @format int32 */
        pageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<HorseMedicalResponse[], ProblemDetails>({
        path: `/horsemedical/search/inspection`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags HorseMedical
     * @name GetExtendedSearchV1
     * @summary Extended search for Horse Medical
     * @request GET:/horsemedical/search/all/extended
     * @deprecated
     * @secure
     */
    getExtendedSearchV1: (
      query?: {
        qCStatuses?: QCStatus[];
        personIds?: string[];
        treatingHisaPersonIds?: string[];
        category?: string;
        race?: string;
        locationId?: string;
        recTypes?: HorseMedicalRecType[];
        excludeRecTypes?: HorseMedicalRecType[];
        /** @maxLength 100 */
        text?: string;
        horseIds?: string[];
        showDeleted?: boolean;
        /** @format date-time */
        startDate?: string;
        /** @format date-time */
        endDate?: string;
        sortBy?: string;
        /** @format int32 */
        sortDirection?: number;
        isAscSort?: boolean;
        /** @format int32 */
        page?: number;
        /** @format int32 */
        pageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<HorseMedicalResponse[], ProblemDetails>({
        path: `/horsemedical/search/all/extended`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags HorseMedical
     * @name GetExtendedSearch
     * @summary Extended search for Horse Medical
     * @request GET:/horsemedical/extended/search
     * @secure
     */
    getExtendedSearch: (
      query?: {
        qCStatuses?: QCStatus[];
        personIds?: string[];
        treatingHisaPersonIds?: string[];
        category?: string;
        race?: string;
        locationId?: string;
        recTypes?: HorseMedicalRecType[];
        excludeRecTypes?: HorseMedicalRecType[];
        /** @maxLength 100 */
        text?: string;
        horseIds?: string[];
        showDeleted?: boolean;
        /** @format date-time */
        startDate?: string;
        /** @format date-time */
        endDate?: string;
        sortBy?: string;
        /** @format int32 */
        sortDirection?: number;
        isAscSort?: boolean;
        /** @format int32 */
        page?: number;
        /** @format int32 */
        pageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<HorseMedicalResponse[], ProblemDetails>({
        path: `/horsemedical/extended/search`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags HorseMedical
     * @name GetQcMatches
     * @summary Search for Horse Medical QC
     * @request GET:/horsemedical/search/all/qc
     * @secure
     */
    getQcMatches: (
      query?: {
        recTypes?: HorseMedicalRecType[] | null;
        excludeRecTypes?: HorseMedicalRecType[] | null;
        /** @maxLength 100 */
        text?: string | null;
        horseIds?: string[] | null;
        showDeleted?: boolean;
        /** @format date-time */
        startDate?: string | null;
        /** @format date-time */
        endDate?: string | null;
        sortBy?: string | null;
        /** @format int32 */
        sortDirection?: number;
        isAscSort?: boolean;
        /** @format int32 */
        page?: number;
        /** @format int32 */
        pageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<HorseMedicalQcResponse[], ProblemDetails>({
        path: `/horsemedical/search/all/qc`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),
  };
  injury = {
    /**
     * No description
     *
     * @tags Injury
     * @name GetById
     * @request GET:/injury/{injuryId}
     * @secure
     */
    getById: (injuryId: string, params: RequestParams = {}) =>
      this.request<InjuryResponse, ProblemDetails>({
        path: `/injury/${injuryId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Injury
     * @name Update
     * @request PUT:/injury/{injuryId}
     * @secure
     */
    update: (
      injuryId: string,
      data: InjuryRequest,
      params: RequestParams = {},
    ) =>
      this.request<InjuryResponse, ProblemDetails>({
        path: `/injury/${injuryId}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Injury
     * @name BatchGet
     * @request PUT:/injury/batch-get
     * @secure
     */
    batchGet: (data: string[], params: RequestParams = {}) =>
      this.request<InjuryResponse[], ProblemDetails>({
        path: `/injury/batch-get`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Injury
     * @name BatchUpdate
     * @request PUT:/injury/batch-update
     * @secure
     */
    batchUpdate: (data: InjuryBatchRequest[], params: RequestParams = {}) =>
      this.request<InjuryResponse, ProblemDetails>({
        path: `/injury/batch-update`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Injury
     * @name Add
     * @request POST:/injury
     * @secure
     */
    add: (data: InjuryRequest, params: RequestParams = {}) =>
      this.request<InjuryResponse, InjuryResponse | ProblemDetails>({
        path: `/injury`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Injury
     * @name GetByPersonIdAsync
     * @request GET:/injury/person/{personId}
     * @secure
     */
    getByPersonIdAsync: (
      personId: string,
      query?: {
        sortBy?: string;
        /** @format int32 */
        sortDirection?: number;
        isAscSort?: boolean;
        /** @format int32 */
        page?: number;
        /** @format int32 */
        pageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<InjuryResponse[], ProblemDetails>({
        path: `/injury/person/${personId}`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Injury
     * @name GetCreatedByPersonId
     * @request GET:/injury/created-by/{personId}
     * @secure
     */
    getCreatedByPersonId: (
      personId: string,
      query?: {
        /** @format date-time */
        startDate?: string;
        /** @format date-time */
        endDate?: string;
        sortBy?: string;
        /** @format int32 */
        sortDirection?: number;
        isAscSort?: boolean;
        /** @format int32 */
        page?: number;
        /** @format int32 */
        pageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<InjuryResponse[], ProblemDetails>({
        path: `/injury/created-by/${personId}`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Injury
     * @name GetByHorseIdAsync
     * @request GET:/injury/horse/{horseId}
     * @secure
     */
    getByHorseIdAsync: (
      horseId: string,
      query?: {
        sortBy?: string;
        /** @format int32 */
        sortDirection?: number;
        isAscSort?: boolean;
        /** @format int32 */
        page?: number;
        /** @format int32 */
        pageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<InjuryResponse[], ProblemDetails>({
        path: `/injury/horse/${horseId}`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Injury
     * @name Search
     * @request GET:/injury/search/{searchText}
     * @secure
     */
    search: (
      searchText: string,
      query?: {
        sortBy?: string;
        /** @format int32 */
        sortDirection?: number;
        isAscSort?: boolean;
        /** @format int32 */
        page?: number;
        /** @format int32 */
        pageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<InjuryResponse[], ProblemDetails>({
        path: `/injury/search/${searchText}`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Injury
     * @name HorseInjurySearch
     * @request GET:/injury/search-horses/{searchText}
     * @secure
     */
    horseInjurySearch: (
      searchText: string,
      query?: {
        outcome?: InjuryHorseOutcome;
        sortBy?: string;
        /** @format int32 */
        sortDirection?: number;
        isAscSort?: boolean;
        /** @format int32 */
        page?: number;
        /** @format int32 */
        pageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<InjuryHorseSearchResponse[], ProblemDetails>({
        path: `/injury/search-horses/${searchText}`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Injury
     * @name AddDocument
     * @request POST:/injury/{injuryId}/document/add
     * @secure
     */
    addDocument: (
      injuryId: string,
      data: {
        fileName: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        PresignedPostResponse,
        PresignedPostResponse | ProblemDetails
      >({
        path: `/injury/${injuryId}/document/add`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Injury
     * @name GetAllDocuments
     * @request GET:/injury/{injuryId}/document/all
     * @secure
     */
    getAllDocuments: (injuryId: string, params: RequestParams = {}) =>
      this.request<DocumentFileResponse[], ProblemDetails>({
        path: `/injury/${injuryId}/document/all`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Injury
     * @name GetDuplicatesByCondition
     * @request POST:/injury/get-duplicates-by-condition
     * @secure
     */
    getDuplicatesByCondition: (
      data: InjuryDuplicateModel,
      params: RequestParams = {},
    ) =>
      this.request<InjuryResponse[], InjuryResponse[] | ProblemDetails>({
        path: `/injury/get-duplicates-by-condition`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  licenseimage = {
    /**
     * No description
     *
     * @tags LicenseImage
     * @name Status
     * @request GET:/licenseimage/status/{token}
     * @secure
     */
    status: (token: string, params: RequestParams = {}) =>
      this.request<LicenseJobItem, ProblemDetails>({
        path: `/licenseimage/status/${token}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags LicenseImage
     * @name Upload
     * @request POST:/licenseimage/upload
     * @secure
     */
    upload: (
      data: {
        /** @format binary */
        file: File;
      },
      params: RequestParams = {},
    ) =>
      this.request<LicenseJobItem, LicenseJobItem | ProblemDetails>({
        path: `/licenseimage/upload`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),
  };
  integrations = {
    /**
     * No description
     *
     * @tags LipchipTransport
     * @name GetArrivals
     * @request GET:/integrations/lipchip/transport/{moveId}/arrivals
     * @secure
     */
    getArrivals: (moveId: string, params: RequestParams = {}) =>
      this.request<LipchipArrivalResponse[], ProblemDetails>({
        path: `/integrations/lipchip/transport/${moveId}/arrivals`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags LipchipTransport
     * @name GetPickups
     * @request GET:/integrations/lipchip/transport/{moveId}/pickups
     * @secure
     */
    getPickups: (moveId: string, params: RequestParams = {}) =>
      this.request<LipchipPickupResponse[], ProblemDetails>({
        path: `/integrations/lipchip/transport/${moveId}/pickups`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags LipchipTransport
     * @name GetDrives
     * @request GET:/integrations/lipchip/transport/{moveId}/drives
     * @secure
     */
    getDrives: (moveId: string, params: RequestParams = {}) =>
      this.request<LipchipDriveUpdateResponse[], ProblemDetails>({
        path: `/integrations/lipchip/transport/${moveId}/drives`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags LipchipTransport
     * @name PostArrivals
     * @request POST:/integrations/lipchip/transport/arrivals
     * @secure
     */
    postArrivals: (data: LipchipArrivalRequest[], params: RequestParams = {}) =>
      this.request<
        LipchipArrivalResponse[],
        LipchipArrivalResponse[] | ProblemDetails
      >({
        path: `/integrations/lipchip/transport/arrivals`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags LipchipTransport
     * @name PostPickups
     * @request POST:/integrations/lipchip/transport/pickups
     * @secure
     */
    postPickups: (data: LipchipPickupRequest[], params: RequestParams = {}) =>
      this.request<
        LipchipPickupResponse[],
        LipchipPickupResponse[] | ProblemDetails
      >({
        path: `/integrations/lipchip/transport/pickups`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags LipchipTransport
     * @name PostDrives
     * @request POST:/integrations/lipchip/transport/drives
     * @secure
     */
    postDrives: (
      data: LipchipDriveUpdateRequest[],
      params: RequestParams = {},
    ) =>
      this.request<
        LipchipDriveUpdateResponse[],
        LipchipDriveUpdateResponse[] | ProblemDetails
      >({
        path: `/integrations/lipchip/transport/drives`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  location = {
    /**
     * No description
     *
     * @tags Location
     * @name CreateLocationAddress
     * @summary Creates a new address for a specific location.
     * @request POST:/location/{locationId}/address
     * @secure
     */
    createLocationAddress: (
      locationId: string,
      data: AddressRequest,
      params: RequestParams = {},
    ) =>
      this.request<
        LocationAddressResponse,
        LocationAddressResponse | ProblemDetails
      >({
        path: `/location/${locationId}/address`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Location
     * @name UpdateLocationAddress
     * @summary Updates a specific address for a specific location by its ID.
     * @request PUT:/location/{locationId}/address/{locationAddressId}
     * @secure
     */
    updateLocationAddress: (
      locationId: string,
      locationAddressId: number,
      data: AddressRequest,
      params: RequestParams = {},
    ) =>
      this.request<LocationAddressResponse, ProblemDetails>({
        path: `/location/${locationId}/address/${locationAddressId}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Location
     * @name DeleteLocationAddress
     * @summary Deletes a specific address for a specific location by its ID.
     * @request DELETE:/location/{locationId}/address/{locationAddressId}
     * @secure
     */
    deleteLocationAddress: (
      locationId: string,
      locationAddressId: number,
      params: RequestParams = {},
    ) =>
      this.request<ActionResult, ProblemDetails>({
        path: `/location/${locationId}/address/${locationAddressId}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Location
     * @name GetLocationAddressById
     * @summary Retrieves a specific address for a specified location by its ID.
     * @request GET:/location/{locationId}/address/{locationAddressId}
     * @secure
     */
    getLocationAddressById: (
      locationId: string,
      locationAddressId: number,
      params: RequestParams = {},
    ) =>
      this.request<LocationAddressResponse, ProblemDetails>({
        path: `/location/${locationId}/address/${locationAddressId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Location
     * @name GetLocationAddresses
     * @summary Retrieves all addresses for a specified location.
     * @request GET:/location/{locationId}/addresses
     * @secure
     */
    getLocationAddresses: (locationId: string, params: RequestParams = {}) =>
      this.request<LocationAddressResponse[], ProblemDetails>({
        path: `/location/${locationId}/addresses`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Location
     * @name CreateLocationContact
     * @summary Creates a new contact for a specific location.
     * @request POST:/location/{locationId}/contact
     * @secure
     */
    createLocationContact: (
      locationId: string,
      data: LocationContactCreateRequest,
      params: RequestParams = {},
    ) =>
      this.request<
        LocationContactResponse,
        LocationContactResponse | ProblemDetails
      >({
        path: `/location/${locationId}/contact`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Location
     * @name UpdateLocationContact
     * @summary Updates a specific contact for a specific location by its ID.
     * @request PUT:/location/{locationId}/contact/{locationContactId}
     * @secure
     */
    updateLocationContact: (
      locationId: string,
      locationContactId: number,
      data: LocationContactUpdateRequest,
      params: RequestParams = {},
    ) =>
      this.request<LocationContactResponse, ProblemDetails>({
        path: `/location/${locationId}/contact/${locationContactId}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Location
     * @name DeleteLocationContact
     * @summary Deletes a specific contact for a specific location by its ID.
     * @request DELETE:/location/{locationId}/contact/{locationContactId}
     * @secure
     */
    deleteLocationContact: (
      locationId: string,
      locationContactId: number,
      params: RequestParams = {},
    ) =>
      this.request<ActionResult, ProblemDetails>({
        path: `/location/${locationId}/contact/${locationContactId}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Location
     * @name GetLocationContact
     * @summary Gets a specific contact for a specific location by its ID.
     * @request GET:/location/{locationId}/contact/{locationContactId}
     * @secure
     */
    getLocationContact: (
      locationId: string,
      locationContactId: number,
      params: RequestParams = {},
    ) =>
      this.request<LocationContactResponse, ProblemDetails>({
        path: `/location/${locationId}/contact/${locationContactId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Location
     * @name GetLocationContacts
     * @summary Gets all contacts for a specific location.
     * @request GET:/location/{locationId}/contacts
     * @secure
     */
    getLocationContacts: (locationId: string, params: RequestParams = {}) =>
      this.request<LocationContactResponse[], ProblemDetails>({
        path: `/location/${locationId}/contacts`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Location
     * @name GetById
     * @summary Retrieves a location by its unique ID.
     * @request GET:/location/{locationId}
     * @secure
     */
    getById: (locationId: string, params: RequestParams = {}) =>
      this.request<LocationResponse, ProblemDetails>({
        path: `/location/${locationId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Location
     * @name Update
     * @summary Updates the specified location with new data.
     * @request PUT:/location/{locationId}
     * @secure
     */
    update: (
      locationId: string,
      data: LocationUpdateRequest,
      params: RequestParams = {},
    ) =>
      this.request<LocationResponse, void | ProblemDetails>({
        path: `/location/${locationId}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Location
     * @name Delete
     * @summary Deletes a location with the specified identifier.
     * @request DELETE:/location/{locationId}
     * @secure
     */
    delete: (locationId: string, params: RequestParams = {}) =>
      this.request<ActionResult, ProblemDetails>({
        path: `/location/${locationId}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Location
     * @name ExtendedSearch
     * @summary Performs an extended search for locations based on various query parameters.
     * @request GET:/location/extended/search
     * @secure
     */
    extendedSearch: (
      query?: {
        type?: LocationType;
        trackCode?: string;
        name?: string;
        searchText?: string;
        vetId?: string;
        associatedVetId?: string;
        regulatoryVetId?: string;
        relatedPersonId?: string;
        locationIds?: string[];
        relatedLocationIds?: string[];
        locationTypes?: LocationType[];
        "address.street"?: string;
        "address.city"?: string;
        "address.state"?: string;
        "address.zipPostalCode"?: string;
        "address.country"?: string;
        "address.unitAptBoxNumber"?: string;
        latLong?: string;
        /** @format double */
        distanceMeters?: number;
        sortBy?: string;
        /** @format int32 */
        sortDirection?: number;
        isAscSort?: boolean;
        /** @format int32 */
        page?: number;
        /** @format int32 */
        pageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<LocationSearchResponse[], ProblemDetails>({
        path: `/location/extended/search`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Location
     * @name Autocomplete
     * @summary Retrieves autocomplete suggestions for locations based on the search text and optional location types.
     * @request GET:/location/autocomplete/{searchText}
     * @secure
     */
    autocomplete: (
      searchText: string,
      query?: {
        /** An optional array of location types to filter the results. */
        locationTypes?: LocationType[];
      },
      params: RequestParams = {},
    ) =>
      this.request<LocationAutocompleteDto[], ProblemDetails>({
        path: `/location/autocomplete/${searchText}`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Location
     * @name GetHisaLocation
     * @summary Retrieves the default HISA location.
     * @request GET:/location/get-hisa-location
     * @secure
     */
    getHisaLocation: (params: RequestParams = {}) =>
      this.request<LocationSearchResponse, ProblemDetails>({
        path: `/location/get-hisa-location`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Location
     * @name GetAllRaceAndTraining
     * @summary Retrieves all race and training tracks with valid track codes.
     * @request GET:/location/all-race-and-training-tracks
     * @secure
     */
    getAllRaceAndTraining: (params: RequestParams = {}) =>
      this.request<LocationSearchResponse[], ProblemDetails>({
        path: `/location/all-race-and-training-tracks`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Location
     * @name GetAllDefaultLocations
     * @summary Retrieves all default locations.
     * @request GET:/location/all-default-locations
     * @secure
     */
    getAllDefaultLocations: (params: RequestParams = {}) =>
      this.request<LocationSearchResponse[], ProblemDetails>({
        path: `/location/all-default-locations`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Location
     * @name SearchByPerson
     * @summary Searches for locations by person ID and optional search text.
     * @request GET:/location/get-by-person/{personId}/{searchText}
     * @secure
     */
    searchByPerson: (
      personId: string,
      searchText: string,
      query?: {
        sortBy?: string;
        /** @format int32 */
        sortDirection?: number;
        isAscSort?: boolean;
        /** @format int32 */
        page?: number;
        /** @format int32 */
        pageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<LocationSearchResponse[], ProblemDetails>({
        path: `/location/get-by-person/${personId}/${searchText}`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Location
     * @name SearchByPersonWithPermissions
     * @summary Searches for locations by person ID, including permission details.
     * @request GET:/location/get-by-person-with-permissions/{personId}/{searchText}
     * @secure
     */
    searchByPersonWithPermissions: (
      personId: string,
      searchText: string,
      query?: {
        sortBy?: string;
        /** @format int32 */
        sortDirection?: number;
        isAscSort?: boolean;
        /** @format int32 */
        page?: number;
        /** @format int32 */
        pageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<LocationSearchWithPermissionResponse[], ProblemDetails>({
        path: `/location/get-by-person-with-permissions/${personId}/${searchText}`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Handles address validation and geolocation assignment if provided.
     *
     * @tags Location
     * @name Add
     * @summary Creates a new location based on the provided request.
     * @request POST:/location
     * @secure
     */
    add: (data: LocationCreateRequest, params: RequestParams = {}) =>
      this.request<LocationResponse, LocationResponse | ProblemDetails>({
        path: `/location`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Location
     * @name ReplacePersonInLocations
     * @summary Replaces a person's references in all locations with another person's identifier.
     * @request PUT:/location/replace-person-in-locations/{personId}/{personIdToKeep}
     * @secure
     */
    replacePersonInLocations: (
      personId: string,
      personIdToKeep: string,
      params: RequestParams = {},
    ) =>
      this.request<ActionResult, ProblemDetails>({
        path: `/location/replace-person-in-locations/${personId}/${personIdToKeep}`,
        method: "PUT",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Location
     * @name GetPersonsIdsFromLocationTables
     * @summary Retrieves the list of person IDs associated with the specified location tables.
     * @request POST:/location/get-persons-ids-from-location-tables
     * @secure
     */
    getPersonsIdsFromLocationTables: (
      data: string[],
      params: RequestParams = {},
    ) =>
      this.request<string[], string[] | ProblemDetails>({
        path: `/location/get-persons-ids-from-location-tables`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Location
     * @name FindLocationNamesByIds
     * @summary Finds and retrieves location names by their unique identifiers.
     * @request POST:/location/find-names-by-ids
     * @secure
     */
    findLocationNamesByIds: (data: string[], params: RequestParams = {}) =>
      this.request<LocationNameSearch[], LocationNameSearch[] | ProblemDetails>(
        {
          path: `/location/find-names-by-ids`,
          method: "POST",
          body: data,
          secure: true,
          type: ContentType.Json,
          format: "json",
          ...params,
        },
      ),

    /**
     * No description
     *
     * @tags Location
     * @name ReassignLocation
     * @summary Reassigns all associated data from one location to another.
     * @request POST:/location/reassign-location/{fromLocationID}/{toLocationID}
     * @secure
     */
    reassignLocation: (
      fromLocationId: string,
      toLocationId: string,
      params: RequestParams = {},
    ) =>
      this.request<number, number | ProblemDetails>({
        path: `/location/reassign-location/${fromLocationId}/${toLocationId}`,
        method: "POST",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Location
     * @name GetCanRace
     * @summary Retrieves the can-race state for a specified location.
     * @request GET:/location/{locationId}/can-race
     * @secure
     */
    getCanRace: (locationId: string, params: RequestParams = {}) =>
      this.request<CanRaceModel, ProblemDetails>({
        path: `/location/${locationId}/can-race`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Location
     * @name ObsoleteDelete
     * @summary Deletes a location with the specified identifier.
     * @request DELETE:/location/{locationId}/delete
     * @deprecated
     * @secure
     */
    obsoleteDelete: (locationId: string, params: RequestParams = {}) =>
      this.request<string[], ProblemDetails>({
        path: `/location/${locationId}/delete`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Location
     * @name AddDocument
     * @summary Adds a document for a specified location.
     * @request POST:/location/{locationId}/document/add
     * @secure
     */
    addDocument: (
      locationId: string,
      data: {
        /** The name of the file to be added. */
        fileName: string;
        /** The type of the document form. */
        type: LocationFormType;
        /** A list of tags associated with the document. */
        tags?: string[];
        /**
         * The identifier of the person submitting the document. Defaults to the currently authenticated user if not provided.
         * @default ""
         */
        personId?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<PresignedPost, PresignedPost | ProblemDetails>({
        path: `/location/${locationId}/document/add`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Location
     * @name GetAllDocuments
     * @summary Return all documents attached to specified location. It can be filtered by file extenion.
     * @request GET:/location/{locationId}/document/all
     * @secure
     */
    getAllDocuments: (
      locationId: string,
      query?: {
        /** Array of file extentions with dots to exclude from the results. It can be null. */
        excludeFileWithExtensions?: string[];
        sortBy?: string;
        /** @format int32 */
        sortDirection?: number;
        isAscSort?: boolean;
        /** @format int32 */
        page?: number;
        /** @format int32 */
        pageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<DocumentFileResponse[], ProblemDetails>({
        path: `/location/${locationId}/document/all`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Location
     * @name AddDailyReports
     * @summary Adds a daily report for a specified location.
     * @request POST:/location/{locationId}/daily-reports-add
     * @secure
     */
    addDailyReports: (
      locationId: string,
      data: {
        fileName?: string;
        personId?: string;
        /** @format int64 */
        fileSize?: number;
        /** @uniqueItems true */
        tags?: string[];
      },
      params: RequestParams = {},
    ) =>
      this.request<PresignedPost, PresignedPost | ProblemDetails>({
        path: `/location/${locationId}/daily-reports-add`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Location
     * @name GetAllDailyReports
     * @summary Retrieves all daily reports for a specified location.
     * @request GET:/location/{locationId}/daily-reports-all
     * @secure
     */
    getAllDailyReports: (locationId: string, params: RequestParams = {}) =>
      this.request<DocumentFileResponse[], ProblemDetails>({
        path: `/location/${locationId}/daily-reports-all`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Location
     * @name GetAvailableDates
     * @summary Retrieves available dates for a specified location and type within a given schedule range.
     * @request GET:/location/{locationId}/available-dates/{type}
     * @secure
     */
    getAvailableDates: (
      locationId: string,
      type: LocationScheduleType,
      query?: {
        /** @format date */
        startDate?: string;
        /** @format date */
        endDate?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<LocationAvailableDateResponse, ProblemDetails>({
        path: `/location/${locationId}/available-dates/${type}`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Location
     * @name CreateScheduleException
     * @summary Creates a new schedule exception for a specified location and type.
     * @request POST:/location/{locationId}/schedules/{type}/exception
     * @secure
     */
    createScheduleException: (
      locationId: string,
      type: LocationScheduleType,
      data: LocationScheduleExceptionRequest,
      params: RequestParams = {},
    ) =>
      this.request<
        LocationScheduleExceptionResponse,
        LocationScheduleExceptionResponse | ProblemDetails
      >({
        path: `/location/${locationId}/schedules/${type}/exception`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Location
     * @name GetScheduleExceptions
     * @summary Retrieves all schedule exceptions for a specified location and type.
     * @request GET:/location/{locationId}/schedules/{type}/exception
     * @secure
     */
    getScheduleExceptions: (
      locationId: string,
      type: LocationScheduleType,
      params: RequestParams = {},
    ) =>
      this.request<LocationScheduleExceptionResponse[], ProblemDetails>({
        path: `/location/${locationId}/schedules/${type}/exception`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Location
     * @name UpdateScheduleException
     * @summary Updates a specific schedule exception for a specified location and type.
     * @request PUT:/location/{locationId}/schedules/{type}/exception/{locationScheduleExceptionId}
     * @secure
     */
    updateScheduleException: (
      locationId: string,
      type: LocationScheduleType,
      locationScheduleExceptionId: number,
      data: LocationScheduleExceptionUpdateRequest,
      params: RequestParams = {},
    ) =>
      this.request<LocationScheduleExceptionResponse, ProblemDetails>({
        path: `/location/${locationId}/schedules/${type}/exception/${locationScheduleExceptionId}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Location
     * @name DeleteScheduleException
     * @summary Deletes a specific schedule exception for a specified location and type by its date.
     * @request DELETE:/location/{locationId}/schedules/{type}/exception/{locationScheduleExceptionId}
     * @secure
     */
    deleteScheduleException: (
      locationId: string,
      type: LocationScheduleType,
      locationScheduleExceptionId: number,
      params: RequestParams = {},
    ) =>
      this.request<ActionResult, ProblemDetails>({
        path: `/location/${locationId}/schedules/${type}/exception/${locationScheduleExceptionId}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Location
     * @name CreateSchedule
     * @summary Creates a new schedule entry for a specified location and type.
     * @request POST:/location/{locationId}/schedules/{type}
     * @secure
     */
    createSchedule: (
      locationId: string,
      type: LocationScheduleType,
      data: LocationScheduleCreateRequest,
      params: RequestParams = {},
    ) =>
      this.request<
        LocationScheduleResponse,
        LocationScheduleResponse | ProblemDetails
      >({
        path: `/location/${locationId}/schedules/${type}`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Location
     * @name GetSchedules
     * @summary Retrieves all schedules for a specified location and type.
     * @request GET:/location/{locationId}/schedules/{type}
     * @secure
     */
    getSchedules: (
      locationId: string,
      type: LocationScheduleType,
      params: RequestParams = {},
    ) =>
      this.request<LocationScheduleResponse[], ProblemDetails>({
        path: `/location/${locationId}/schedules/${type}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Location
     * @name UpdateSchedule
     * @summary Updates an existing schedule entry for a specified location and type.
     * @request PATCH:/location/{locationId}/schedules/{type}/{locationScheduleId}
     * @secure
     */
    updateSchedule: (
      locationId: string,
      type: LocationScheduleType,
      locationScheduleId: number,
      data: LocationSchedulePatchRequest,
      params: RequestParams = {},
    ) =>
      this.request<LocationScheduleResponse, ProblemDetails>({
        path: `/location/${locationId}/schedules/${type}/${locationScheduleId}`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Location
     * @name DeleteSchedule
     * @summary Deletes a schedule entry for a specified location and type.
     * @request DELETE:/location/{locationId}/schedules/{type}/{locationScheduleId}
     * @secure
     */
    deleteSchedule: (
      locationId: string,
      type: LocationScheduleType,
      locationScheduleId: number,
      params: RequestParams = {},
    ) =>
      this.request<ActionResult, ProblemDetails>({
        path: `/location/${locationId}/schedules/${type}/${locationScheduleId}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  logs = {
    /**
     * No description
     *
     * @tags Logs
     * @name Search
     * @request GET:/logs/search
     * @secure
     */
    search: (
      query?: {
        logGroup?: string;
        search?: string;
        /** @format date-time */
        dateFrom?: string;
        /** @format date-time */
        dateTo?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<LogSearchEntry[], ProblemDetails>({
        path: `/logs/search`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Logs
     * @name Search2
     * @request GET:/logs/search/day
     * @originalName search
     * @duplicate
     * @secure
     */
    search2: (
      query?: {
        logGroup?: string;
        search?: string;
        /** @format date-time */
        dateTime?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<LogSearchEntry[], ProblemDetails>({
        path: `/logs/search/day`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Logs
     * @name GetByContext
     * @request GET:/logs/context/{contextId}
     * @secure
     */
    getByContext: (
      contextId: string,
      query?: {
        logGroup?: string;
        /** @format date-time */
        dateTime?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<LogSearchEntry[], ProblemDetails>({
        path: `/logs/context/${contextId}`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),
  };
  mail = {
    /**
     * No description
     *
     * @tags Mail
     * @name GetMessagesByReceiverId
     * @request GET:/mail/{personId}/list
     * @deprecated
     * @secure
     */
    getMessagesByReceiverId: (
      personId: string,
      query?: {
        showDeleted?: boolean;
        sortBy?: string;
        /** @format int32 */
        sortDirection?: number;
        isAscSort?: boolean;
        /** @format int32 */
        page?: number;
        /** @format int32 */
        pageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<MailMessageModel[], ProblemDetails>({
        path: `/mail/${personId}/list`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Mail
     * @name FindMessagesByReceiverId
     * @request POST:/mail/{personId}/list
     * @secure
     */
    findMessagesByReceiverId: (
      personId: string,
      data: SecureMailSearchRequest,
      params: RequestParams = {},
    ) =>
      this.request<MailMessageModel[], MailMessageModel[] | ProblemDetails>({
        path: `/mail/${personId}/list`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Mail
     * @name FindByText
     * @request GET:/mail/find-mail-by-text/{searchString}
     * @secure
     */
    findByText: (
      searchString: string,
      query?: {
        showDeleted?: boolean;
        sortBy?: string;
        /** @format int32 */
        sortDirection?: number;
        isAscSort?: boolean;
        /** @format int32 */
        page?: number;
        /** @format int32 */
        pageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<MailMessageModel[], ProblemDetails>({
        path: `/mail/find-mail-by-text/${searchString}`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Mail
     * @name MakeActionById
     * @request PUT:/mail/action/{id}
     * @secure
     */
    makeActionById: (
      id: string,
      data: MailingAction,
      params: RequestParams = {},
    ) =>
      this.request<MailMessageModel, ProblemDetails>({
        path: `/mail/action/${id}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Mail
     * @name MakeActionBatch
     * @request PUT:/mail/batch/action
     * @secure
     */
    makeActionBatch: (data: BatchActionRequest, params: RequestParams = {}) =>
      this.request<MailMessageModel[], ProblemDetails>({
        path: `/mail/batch/action`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Mail
     * @name MakeAction
     * @request PUT:/mail/take-action/{messageId}/{userAction}
     * @secure
     */
    makeAction: (
      userAction: string,
      messageId: string,
      params: RequestParams = {},
    ) =>
      this.request<MailActionResponse, ProblemDetails>({
        path: `/mail/take-action/${messageId}/${userAction}`,
        method: "PUT",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  messagesender = {
    /**
     * No description
     *
     * @tags MessageSender
     * @name SendMessage
     * @request POST:/messagesender/sendmessage
     * @secure
     */
    sendMessage: (data: MessageSenderQuery, params: RequestParams = {}) =>
      this.request<ActionResult, ActionResult | ProblemDetails>({
        path: `/messagesender/sendmessage`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  messagetemplate = {
    /**
     * No description
     *
     * @tags MessageTemplate
     * @name GetById
     * @request GET:/messagetemplate/{messageTemplateId}
     * @secure
     */
    getById: (messageTemplateId: string, params: RequestParams = {}) =>
      this.request<MessageTemplateResponse, ProblemDetails>({
        path: `/messagetemplate/${messageTemplateId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags MessageTemplate
     * @name Update
     * @request PUT:/messagetemplate/{messageTemplateId}
     * @secure
     */
    update: (
      messageTemplateId: string,
      data: MessageTemplateRequest,
      params: RequestParams = {},
    ) =>
      this.request<MessageTemplateResponse, ProblemDetails>({
        path: `/messagetemplate/${messageTemplateId}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags MessageTemplate
     * @name GetAll
     * @request GET:/messagetemplate/all
     * @secure
     */
    getAll: (params: RequestParams = {}) =>
      this.request<MessageTemplateResponse[], ProblemDetails>({
        path: `/messagetemplate/all`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags MessageTemplate
     * @name GetAvailableEnvironments
     * @request GET:/messagetemplate/get-available-environments
     * @secure
     */
    getAvailableEnvironments: (params: RequestParams = {}) =>
      this.request<string[], ProblemDetails>({
        path: `/messagetemplate/get-available-environments`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags MessageTemplate
     * @name Add
     * @request POST:/messagetemplate
     * @secure
     */
    add: (data: MessageTemplateRequest, params: RequestParams = {}) =>
      this.request<
        MessageTemplateResponse,
        MessageTemplateResponse | ProblemDetails
      >({
        path: `/messagetemplate`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags MessageTemplate
     * @name ExpandedTemplate
     * @request POST:/messagetemplate/{messageTemplateId}/expand
     * @secure
     */
    expandedTemplate: (
      messageTemplateId: string,
      data: Record<string, string>,
      params: RequestParams = {},
    ) =>
      this.request<
        MessageTemplateResponse,
        MessageTemplateResponse | ProblemDetails
      >({
        path: `/messagetemplate/${messageTemplateId}/expand`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags MessageTemplate
     * @name SendNotification
     * @request POST:/messagetemplate/{messageTemplateId}/send-many
     * @secure
     */
    sendNotification: (
      messageTemplateId: string,
      data: Record<string, string>,
      query?: {
        personIds?: string[];
      },
      params: RequestParams = {},
    ) =>
      this.request<ActionResult, ActionResult | ProblemDetails>({
        path: `/messagetemplate/${messageTemplateId}/send-many`,
        method: "POST",
        query: query,
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags MessageTemplate
     * @name SendEmail
     * @request POST:/messagetemplate/{messageTemplateId}/email/{email}
     * @secure
     */
    sendEmail: (
      messageTemplateId: string,
      email: string,
      data: Record<string, string>,
      params: RequestParams = {},
    ) =>
      this.request<ActionResult, ActionResult | ProblemDetails>({
        path: `/messagetemplate/${messageTemplateId}/email/${email}`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags MessageTemplate
     * @name SendSms
     * @request POST:/messagetemplate/{messageTemplateId}/sms/{phone}
     * @secure
     */
    sendSms: (
      messageTemplateId: string,
      phone: string,
      data: Record<string, string>,
      params: RequestParams = {},
    ) =>
      this.request<ActionResult, ActionResult | ProblemDetails>({
        path: `/messagetemplate/${messageTemplateId}/sms/${phone}`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags MessageTemplate
     * @name Replicate
     * @request GET:/messagetemplate/replicate/{fromEnvironment}
     * @secure
     */
    replicate: (fromEnvironment: string, params: RequestParams = {}) =>
      this.request<boolean, ProblemDetails>({
        path: `/messagetemplate/replicate/${fromEnvironment}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  notificationdistribution = {
    /**
     * No description
     *
     * @tags NotificationDistribution
     * @name Add
     * @request POST:/notificationdistribution/add
     * @secure
     */
    add: (data: NotificationDistributionRequest, params: RequestParams = {}) =>
      this.request<
        NotificationDistributionResponse,
        NotificationDistributionResponse | ProblemDetails
      >({
        path: `/notificationdistribution/add`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags NotificationDistribution
     * @name GetAll
     * @request POST:/notificationdistribution/get-all
     * @secure
     */
    getAll: (params: RequestParams = {}) =>
      this.request<
        NotificationDistributionResponse[],
        NotificationDistributionResponse[] | ProblemDetails
      >({
        path: `/notificationdistribution/get-all`,
        method: "POST",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags NotificationDistribution
     * @name Search
     * @request GET:/notificationdistribution/search/{searchText}
     * @secure
     */
    search: (
      searchText: string,
      query?: {
        sortBy?: string;
        /** @format int32 */
        sortDirection?: number;
        isAscSort?: boolean;
        /** @format int32 */
        page?: number;
        /** @format int32 */
        pageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<NotificationDistributionResponse[], ProblemDetails>({
        path: `/notificationdistribution/search/${searchText}`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags NotificationDistribution
     * @name GetNotificationById
     * @request GET:/notificationdistribution/get-notification-by-id/{id}
     * @secure
     */
    getNotificationById: (id: string, params: RequestParams = {}) =>
      this.request<NotificationDistributionResponse, ProblemDetails>({
        path: `/notificationdistribution/get-notification-by-id/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  notificationlog = {
    /**
     * No description
     *
     * @tags NotificationLog
     * @name NotificationLogSearch
     * @summary Searches for Notification Logs within a specified date range.
     * @request GET:/notificationlog/{startDate}/{endDate}/notificationlog-search
     * @secure
     */
    notificationLogSearch: (
      startDate: string,
      endDate: string,
      query?: {
        /** The search text for filtering logs. */
        searchText?: string;
        sortBy?: string;
        /** @format int32 */
        sortDirection?: number;
        isAscSort?: boolean;
        /** @format int32 */
        page?: number;
        /** @format int32 */
        pageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<NotificationLogSearchResponse[], void | ProblemDetails>({
        path: `/notificationlog/${startDate}/${endDate}/notificationlog-search`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags NotificationLog
     * @name NotificationLogByIdSearch
     * @summary Retrieves Notification Logs by a specific Mail ID.
     * @request GET:/notificationlog/{mailId}/notificationlog-by-id-search
     * @secure
     */
    notificationLogByIdSearch: (
      mailId: string,
      query?: {
        sortBy?: string;
        /** @format int32 */
        sortDirection?: number;
        isAscSort?: boolean;
        /** @format int32 */
        page?: number;
        /** @format int32 */
        pageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<NotificationLogSearchResponse[], void | ProblemDetails>({
        path: `/notificationlog/${mailId}/notificationlog-by-id-search`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags NotificationLog
     * @name NotificationLogByPersonIdSearch
     * @summary Retrieves Notification Logs by a specific Person ID.
     * @request GET:/notificationlog/{personId}/notificationlog-by-person-id-search
     * @secure
     */
    notificationLogByPersonIdSearch: (
      personId: string,
      query?: {
        sortBy?: string;
        /** @format int32 */
        sortDirection?: number;
        isAscSort?: boolean;
        /** @format int32 */
        page?: number;
        /** @format int32 */
        pageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<NotificationLogSearchResponse[], void | ProblemDetails>({
        path: `/notificationlog/${personId}/notificationlog-by-person-id-search`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags NotificationLog
     * @name NotificationLogByPersonIdAndDateRangeSearch
     * @summary Retrieves Notification Logs by a Person ID and within a specified date range.
     * @request GET:/notificationlog/{personId}/notificationlog-by-person-id-and-date-range-search
     * @secure
     */
    notificationLogByPersonIdAndDateRangeSearch: (
      personId: string,
      query?: {
        /** @format date-time */
        startDate?: string;
        /** @format date-time */
        endDate?: string;
        sortBy?: string;
        /** @format int32 */
        sortDirection?: number;
        isAscSort?: boolean;
        /** @format int32 */
        page?: number;
        /** @format int32 */
        pageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<NotificationLogSearchResponse[], void | ProblemDetails>({
        path: `/notificationlog/${personId}/notificationlog-by-person-id-and-date-range-search`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags NotificationLog
     * @name NotificationLogByHorseIdSearch
     * @summary Retrieves Notification Logs by a Horse ID.
     * @request GET:/notificationlog/{horseId}/notificationlog-by-horse-id-search
     * @secure
     */
    notificationLogByHorseIdSearch: (
      horseId: string,
      query?: {
        searchText?: string;
        /** @format date-time */
        startDate?: string;
        /** @format date-time */
        endDate?: string;
        sortBy?: string;
        /** @format int32 */
        sortDirection?: number;
        isAscSort?: boolean;
        /** @format int32 */
        page?: number;
        /** @format int32 */
        pageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<NotificationLogSearchResponse[], void | ProblemDetails>({
        path: `/notificationlog/${horseId}/notificationlog-by-horse-id-search`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),
  };
  order = {
    /**
     * No description
     *
     * @tags Order
     * @name ExtendedSearch
     * @summary Performs an extended search for order (test service) based on various query parameters.
     * @request GET:/order/extended/search
     * @secure
     */
    extendedSearch: (
      query?: {
        withDeleted?: boolean;
        orderCode?: string;
        personId?: string;
        productTypes?: ProductType[];
        paidType?: OrderPaymentType;
        searchText?: string;
        /** @format date-time */
        startDate?: string;
        /** @format date-time */
        endDate?: string;
        sortBy?: string;
        /** @format int32 */
        sortDirection?: number;
        isAscSort?: boolean;
        /** @format int32 */
        page?: number;
        /** @format int32 */
        pageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<OrderResponse[], ProblemDetails>({
        path: `/order/extended/search`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Order
     * @name GetOrderById
     * @summary Return Order by orderId.
     * @request GET:/order/{orderId}
     * @secure
     */
    getOrderById: (orderId: string, params: RequestParams = {}) =>
      this.request<OrderResponse, string | ProblemDetails>({
        path: `/order/${orderId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Order
     * @name UpdateOrder
     * @summary Update Order.
     * @request PUT:/order/{orderId}
     * @secure
     */
    updateOrder: (
      orderId: string,
      data: OrderRequest,
      params: RequestParams = {},
    ) =>
      this.request<OrderResponse, string | ProblemDetails>({
        path: `/order/${orderId}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Order
     * @name DeleteOrder
     * @summary Delete Order.
     * @request DELETE:/order/{orderId}
     * @secure
     */
    deleteOrder: (orderId: string, params: RequestParams = {}) =>
      this.request<ActionResult, string | ProblemDetails>({
        path: `/order/${orderId}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Order
     * @name AddNewOrder
     * @summary Insert new Order.
     * @request POST:/order
     * @secure
     */
    addNewOrder: (data: OrderRequest, params: RequestParams = {}) =>
      this.request<OrderResponse, OrderResponse | ProblemDetails>({
        path: `/order`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Order
     * @name CreateOrderInvoice
     * @summary Create Order Invoice.
     * @request POST:/order/stripe/create-order-invoice/{orderId}
     * @secure
     */
    createOrderInvoice: (orderId: string, params: RequestParams = {}) =>
      this.request<ActionResult, ActionResult | ProblemDetails>({
        path: `/order/stripe/create-order-invoice/${orderId}`,
        method: "POST",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Order
     * @name RefreshPaymentUrl
     * @summary Update paymet URL in Order if if older than 24 hours
     * @request POST:/order/stripe/refresh-payment-url/{orderId}
     * @secure
     */
    refreshPaymentUrl: (orderId: string, params: RequestParams = {}) =>
      this.request<string, string | ProblemDetails>({
        path: `/order/stripe/refresh-payment-url/${orderId}`,
        method: "POST",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Order
     * @name MergePersonsOrdersAndPayments
     * @summary Merge orders of one person into another one with payments
     * @request PUT:/order/merge/persons/{oldPersonId}/{newPersonId}
     * @secure
     */
    mergePersonsOrdersAndPayments: (
      oldPersonId: string,
      newPersonId: string,
      params: RequestParams = {},
    ) =>
      this.request<ActionResult, string | ProblemDetails>({
        path: `/order/merge/persons/${oldPersonId}/${newPersonId}`,
        method: "PUT",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Order
     * @name AddDailyReports
     * @summary Add files to person by order Id.
     * @request POST:/order/{orderId}/document/add
     * @secure
     */
    addDailyReports: (
      orderId: string,
      data: {
        /** File name. */
        fileName: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<PresignedPost, PresignedPost | ProblemDetails>({
        path: `/order/${orderId}/document/add`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Order
     * @name GetAllDailyReports
     * @summary Get files attached to person by order Id.
     * @request GET:/order/{orderId}/document/all
     * @secure
     */
    getAllDailyReports: (orderId: string, params: RequestParams = {}) =>
      this.request<DocumentFileResponse[], string | ProblemDetails>({
        path: `/order/${orderId}/document/all`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  payment = {
    /**
     * No description
     *
     * @tags Payment
     * @name GetById
     * @summary Gets a payment by its ID.
     * @request GET:/payment/{paymentId}
     * @secure
     */
    getById: (paymentId: string, params: RequestParams = {}) =>
      this.request<PaymentResponse, ProblemDetails>({
        path: `/payment/${paymentId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Payment
     * @name GetByRulingId
     * @summary Retrieves payments associated with a specific ruling ID.
     * @request GET:/payment/by-ruling-id/{rulingId}
     * @secure
     */
    getByRulingId: (rulingId: string, params: RequestParams = {}) =>
      this.request<PaymentResponse[], ProblemDetails>({
        path: `/payment/by-ruling-id/${rulingId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Payment
     * @name GetByOrderId
     * @summary Retrieves payments associated with a specific order ID.
     * @request GET:/payment/by-orer-id/{orderId}
     * @secure
     */
    getByOrderId: (orderId: string, params: RequestParams = {}) =>
      this.request<PaymentResponse[], ProblemDetails>({
        path: `/payment/by-orer-id/${orderId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Payment
     * @name Search
     * @summary Searches payments by text with pagination.
     * @request GET:/payment/search/{searchText}
     * @secure
     */
    search: (
      searchText: string,
      query?: {
        sortBy?: string;
        /** @format int32 */
        sortDirection?: number;
        isAscSort?: boolean;
        /** @format int32 */
        page?: number;
        /** @format int32 */
        pageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<PaymentResponse[], ProblemDetails>({
        path: `/payment/search/${searchText}`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Payment
     * @name SearchRulings
     * @summary Searches ruling payments by text with pagination.
     * @request GET:/payment/search/rulings/{searchText}
     * @secure
     */
    searchRulings: (
      searchText: string,
      query?: {
        sortBy?: string;
        /** @format int32 */
        sortDirection?: number;
        isAscSort?: boolean;
        /** @format int32 */
        page?: number;
        /** @format int32 */
        pageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<PaymentResponse[], ProblemDetails>({
        path: `/payment/search/rulings/${searchText}`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Payment
     * @name SearchOrders
     * @summary Searches order payments by text with pagination.
     * @request GET:/payment/search/orders/{searchText}
     * @secure
     */
    searchOrders: (
      searchText: string,
      query?: {
        sortBy?: string;
        /** @format int32 */
        sortDirection?: number;
        isAscSort?: boolean;
        /** @format int32 */
        page?: number;
        /** @format int32 */
        pageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<PaymentResponse[], ProblemDetails>({
        path: `/payment/search/orders/${searchText}`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Payment
     * @name AddManualPaymentRuling
     * @summary Manually adds a new payment ruling.
     * @request POST:/payment/add-manual
     * @secure
     */
    addManualPaymentRuling: (
      data: PaymentRequest,
      params: RequestParams = {},
    ) =>
      this.request<PaymentResponse, PaymentResponse | ProblemDetails>({
        path: `/payment/add-manual`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Payment
     * @name AddManualPaymentOrder
     * @summary Manually adds a new order payment.
     * @request POST:/payment/add-manual-order
     * @secure
     */
    addManualPaymentOrder: (data: PaymentRequest, params: RequestParams = {}) =>
      this.request<PaymentResponse, PaymentResponse | ProblemDetails>({
        path: `/payment/add-manual-order`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Payment
     * @name CreateInvoiceUrl
     * @summary Creates an invoice URL for a ruling.
     * @request POST:/payment/stripe/create-invoice
     * @deprecated
     * @secure
     */
    createInvoiceUrl: (
      query?: {
        /** Person ID. */
        hisaPersonId?: string;
        /** Ruling ID. */
        rulingId?: string;
        /**
         * Invoice amount.
         * @format double
         */
        amount?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<ActionResult, ActionResult | ProblemDetails>({
        path: `/payment/stripe/create-invoice`,
        method: "POST",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Payment
     * @name CreateRulingInvoice
     * @summary Creates an invoice URL for a ruling.
     * @request POST:/payment/stripe/create-invoice/{hisaPersonId}/{rulingId}/{amount}
     * @secure
     */
    createRulingInvoice: (
      hisaPersonId: string,
      rulingId: string,
      amount: number,
      params: RequestParams = {},
    ) =>
      this.request<string, string | ProblemDetails>({
        path: `/payment/stripe/create-invoice/${hisaPersonId}/${rulingId}/${amount}`,
        method: "POST",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Payment
     * @name IsRulingCanBePaid
     * @summary Checks if a ruling can be paid.
     * @request GET:/payment/is-ruling-can-be-paid/{hisaPersonId}/{rulingId}
     * @secure
     */
    isRulingCanBePaid: (
      hisaPersonId: string,
      rulingId: string,
      params: RequestParams = {},
    ) =>
      this.request<boolean, ProblemDetails>({
        path: `/payment/is-ruling-can-be-paid/${hisaPersonId}/${rulingId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Payment
     * @name CreateOrderInvoiceOld
     * @summary Creates an invoice for an order.
     * @request POST:/payment/stripe/create-order-invoice
     * @deprecated
     * @secure
     */
    createOrderInvoiceOld: (
      query?: {
        /**
         * The unique identifier of the order.
         * @format uuid
         */
        orderId?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<TestOrderInvoice, TestOrderInvoice | ProblemDetails>({
        path: `/payment/stripe/create-order-invoice`,
        method: "POST",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Payment
     * @name CreateOrderInvoice
     * @summary Creates an invoice for an order.
     * @request POST:/payment/stripe/create-order-invoice/{orderId}
     * @secure
     */
    createOrderInvoice: (orderId: string, params: RequestParams = {}) =>
      this.request<TestOrderInvoice, TestOrderInvoice | ProblemDetails>({
        path: `/payment/stripe/create-order-invoice/${orderId}`,
        method: "POST",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  person = {
    /**
     * No description
     *
     * @tags Person
     * @name GetCanRace
     * @summary Retrieves whether a person can race on a specific date.
     * @request GET:/person/{personId}/can-race
     * @secure
     */
    getCanRace: (
      personId: string,
      query?: {
        /** The type of person (e.g., jockey, trainer). */
        personTypeName?: string;
        /**
         * The date to check if the person can race (optional).
         * @format date
         */
        date?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<CanRacePersonResponse, ProblemDetails>({
        path: `/person/${personId}/can-race`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Person
     * @name GetCanRaceByDateRange
     * @summary Retrieves whether a person can race within a specific date range.
     * @request GET:/person/{personId}/can-race-by-date-range
     * @secure
     */
    getCanRaceByDateRange: (
      personId: string,
      query?: {
        /**
         * The start date of the range.
         * @format date
         */
        startDate?: string;
        /**
         * The end date of the range.
         * @format date
         */
        endDate?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<CanRacePersonResponse[], ProblemDetails>({
        path: `/person/${personId}/can-race-by-date-range`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Person
     * @name GetCanRaceAry
     * @summary Retrieves the race eligibility statuses for multiple persons and a specified date.
     * @request POST:/person/can-race-ary
     * @secure
     */
    getCanRaceAry: (
      data: PersonCanRaceByArrayRequest,
      params: RequestParams = {},
    ) =>
      this.request<
        CanRacePersonResponse[],
        CanRacePersonResponse[] | ProblemDetails
      >({
        path: `/person/can-race-ary`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Person
     * @name GetCanRaceJockey
     * @summary Retrieves whether a jockey can race at a specific location on a specific date.
     * @request GET:/person/{personId}/can-race/jockey/{locationId}
     * @secure
     */
    getCanRaceJockey: (
      personId: string,
      locationId: string,
      query?: {
        /**
         * The date to check if the jockey can race (optional).
         * @format date
         */
        date?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<CanRacePersonResponse, ProblemDetails>({
        path: `/person/${personId}/can-race/jockey/${locationId}`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Person
     * @name GetCognitoUser
     * @summary Retrieves Cognito data for a specific person.
     * @request GET:/person/{personId}/get-cognito-user
     * @secure
     */
    getCognitoUser: (personId: string, params: RequestParams = {}) =>
      this.request<PersonCognitoResponse, ProblemDetails>({
        path: `/person/${personId}/get-cognito-user`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Person
     * @name EnsureCognitoUser
     * @summary Ensures a Cognito user exists for a specific person.
     * @request PUT:/person/{personId}/ensure-cognito-user
     * @secure
     */
    ensureCognitoUser: (personId: string, params: RequestParams = {}) =>
      this.request<ActionResult, ProblemDetails>({
        path: `/person/${personId}/ensure-cognito-user`,
        method: "PUT",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Person
     * @name RegisterAPersonWithCognito
     * @summary Registers a person with Cognito.
     * @request POST:/person/with-cognito/{password}
     * @secure
     */
    registerAPersonWithCognito: (
      password: string,
      data: PersonUpdateRequest,
      query?: {
        /**
         * Indicates if the person is acting as their own jockey agent (optional).
         * @default false
         */
        isActingAsOwnJockeyAgent?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<PersonResponse, PersonResponse | ProblemDetails>({
        path: `/person/with-cognito/${password}`,
        method: "POST",
        query: query,
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Person
     * @name GetById
     * @summary Gets a person by their ID.
     * @request GET:/person/{personId}
     * @secure
     */
    getById: (personId: string, params: RequestParams = {}) =>
      this.request<PersonResponse, ProblemDetails>({
        path: `/person/${personId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Person
     * @name UpdatePerson
     * @summary Updates a person's details.
     * @request PUT:/person/{personId}
     * @secure
     */
    updatePerson: (
      personId: string,
      data: PersonUpdateRequest,
      params: RequestParams = {},
    ) =>
      this.request<PersonResponse, void | ProblemDetails>({
        path: `/person/${personId}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Person
     * @name BatchGet
     * @summary Retrieves multiple persons by their IDs.
     * @request PUT:/person/batch-get
     * @secure
     */
    batchGet: (data: string[], params: RequestParams = {}) =>
      this.request<PersonResponse[], ProblemDetails>({
        path: `/person/batch-get`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Person
     * @name BatchUpdate
     * @summary Updates multiple persons with new details.
     * @request PUT:/person/batch-update
     * @secure
     */
    batchUpdate: (data: PersonUpdateRequest[], params: RequestParams = {}) =>
      this.request<PersonResponse, ProblemDetails>({
        path: `/person/batch-update`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Person
     * @name UpdatePin
     * @summary Updates a person's PIN code.
     * @request GET:/person/update-pin/{personId}/{newPin}
     * @secure
     */
    updatePin: (personId: string, newPin: string, params: RequestParams = {}) =>
      this.request<boolean, ProblemDetails>({
        path: `/person/update-pin/${personId}/${newPin}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Person
     * @name ActivateAccount
     * @summary Activates a person's account.
     * @request POST:/person/activate/{personId}
     * @secure
     */
    activateAccount: (personId: string, params: RequestParams = {}) =>
      this.request<PersonResponse, PersonResponse | ProblemDetails>({
        path: `/person/activate/${personId}`,
        method: "POST",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Person
     * @name RegisterPerson
     * @summary Registers a new person.
     * @request POST:/person
     * @secure
     */
    registerPerson: (data: PersonUpdateRequest, params: RequestParams = {}) =>
      this.request<PersonResponse, PersonResponse | ProblemDetails>({
        path: `/person`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Person
     * @name FindCreate
     * @summary Registers a new person.
     * @request POST:/person/find-create
     * @secure
     */
    findCreate: (data: PersonUpdateRequest, params: RequestParams = {}) =>
      this.request<PersonResponse, PersonResponse | ProblemDetails>({
        path: `/person/find-create`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Person
     * @name DeletePersonAsync
     * @summary Deletes a person by their ID.
     * @request DELETE:/person/{personId}/delete
     * @secure
     */
    deletePersonAsync: (personId: string, params: RequestParams = {}) =>
      this.request<string[], ProblemDetails>({
        path: `/person/${personId}/delete`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Person
     * @name SetPassword
     * @summary Sets a new password for a person.
     * @request POST:/person/{personId}/set-password/{password}
     * @secure
     */
    setPassword: (
      personId: string,
      password: string,
      params: RequestParams = {},
    ) =>
      this.request<ActionResult, ActionResult | ProblemDetails>({
        path: `/person/${personId}/set-password/${password}`,
        method: "POST",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Person
     * @name SetBarredFromRacing
     * @summary Bars a person from racing.
     * @request PUT:/person/{personId}/barr-from-racing
     * @secure
     */
    setBarredFromRacing: (personId: string, params: RequestParams = {}) =>
      this.request<PersonResponse, ProblemDetails>({
        path: `/person/${personId}/barr-from-racing`,
        method: "PUT",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Person
     * @name GetRecentActivities
     * @summary Retrieves recent activities for a person.
     * @request GET:/person/{personId}/activities/recent
     * @secure
     */
    getRecentActivities: (personId: string, params: RequestParams = {}) =>
      this.request<PersonActivitiesResponse, ProblemDetails>({
        path: `/person/${personId}/activities/recent`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Person
     * @name GetIsActive
     * @summary Checks if a person is active.
     * @request GET:/person/{personId}/is-active
     * @secure
     */
    getIsActive: (personId: string, params: RequestParams = {}) =>
      this.request<boolean, ProblemDetails>({
        path: `/person/${personId}/is-active`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Person
     * @name GetMoneyOwed
     * @summary Retrieves the money owed by a person.
     * @request GET:/person/{personId}/money-owed
     * @secure
     */
    getMoneyOwed: (personId: string, params: RequestParams = {}) =>
      this.request<MoneyOwedResponse, ProblemDetails>({
        path: `/person/${personId}/money-owed`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Person
     * @name GetTjcRegStatus
     * @summary Retrieves the TJC registration status for a person.
     * @request GET:/person/{personId}/get-tjc-reg-status
     * @secure
     */
    getTjcRegStatus: (personId: string, params: RequestParams = {}) =>
      this.request<TjcDetailsResponse, ProblemDetails>({
        path: `/person/${personId}/get-tjc-reg-status`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Person
     * @name SetTjcReg
     * @summary Updates the TJC registration status for a person.
     * @request POST:/person/{personId}/update-tjc-reg
     * @secure
     */
    setTjcReg: (personId: string, params: RequestParams = {}) =>
      this.request<TjcDetailsResponse, TjcDetailsResponse | ProblemDetails>({
        path: `/person/${personId}/update-tjc-reg`,
        method: "POST",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Person
     * @name GetAllRoles
     * @summary Retrieves all available person roles.
     * @request GET:/person/all-person-roles
     * @secure
     */
    getAllRoles: (params: RequestParams = {}) =>
      this.request<string[], ProblemDetails>({
        path: `/person/all-person-roles`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Person
     * @name GenerateUserName
     * @summary Generates a username based on the provided request details.
     * @request POST:/person/username/generate
     * @secure
     */
    generateUserName: (
      data: GenerateUserNameRequest,
      params: RequestParams = {},
    ) =>
      this.request<
        PersonUserNameResponse,
        PersonUserNameResponse | ProblemDetails
      >({
        path: `/person/username/generate`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Person
     * @name CheckUserName
     * @summary Checks if the provided username is available.
     * @request GET:/person/username/check/{userName}
     * @secure
     */
    checkUserName: (userName: string, params: RequestParams = {}) =>
      this.request<PersonUserNameResponse, void | ProblemDetails>({
        path: `/person/username/check/${userName}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Person
     * @name CheckPersonPin
     * @summary Verifies the PIN code for a person.
     * @request GET:/person/{personId}/check-pin
     * @secure
     */
    checkPersonPin: (
      personId: string,
      query?: {
        /** The PIN code to verify. */
        pin?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<boolean, ProblemDetails>({
        path: `/person/${personId}/check-pin`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Person
     * @name GetMfaCode
     * @summary Retrieves the most recent MFA code for a person.
     * @request GET:/person/{personId}/mfa-code
     * @secure
     */
    getMfaCode: (personId: string, params: RequestParams = {}) =>
      this.request<string, ProblemDetails>({
        path: `/person/${personId}/mfa-code`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Person
     * @name SetMfaRoute
     * @summary Sets the MFA route for a person.
     * @request GET:/person/{personId}/set-mfa-route
     * @secure
     */
    setMfaRoute: (
      personId: string,
      query?: {
        /** The MFA route to set. */
        route?: MfaRoute;
      },
      params: RequestParams = {},
    ) =>
      this.request<ActionResult, ProblemDetails>({
        path: `/person/${personId}/set-mfa-route`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Person
     * @name MergePersonsRulingsAndOrdersAndPayments
     * @summary Merges rulings, orders, and payments of two persons.
     * @request GET:/person/merge/persons-rulings-orders-payments/{oldPersonId}/{newPersonId}
     * @secure
     */
    mergePersonsRulingsAndOrdersAndPayments: (
      oldPersonId: string,
      newPersonId: string,
      params: RequestParams = {},
    ) =>
      this.request<ActionResult, void | ProblemDetails>({
        path: `/person/merge/persons-rulings-orders-payments/${oldPersonId}/${newPersonId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Person
     * @name UpdateJockeyAgent
     * @summary Updates the JockeyAgentId field by merging old and new persons.
     * @request GET:/person/merge/update-jockeyagentid-field/{oldPersonId}/{newPersonId}
     * @secure
     */
    updateJockeyAgent: (
      oldPersonId: string,
      newPersonId: string,
      query?: {
        sortBy?: string;
        /** @format int32 */
        sortDirection?: number;
        isAscSort?: boolean;
        /** @format int32 */
        page?: number;
        /** @format int32 */
        pageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<ActionResult, void | ProblemDetails>({
        path: `/person/merge/update-jockeyagentid-field/${oldPersonId}/${newPersonId}`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Person
     * @name ResendRegNotification
     * @request POST:/person/{personId}/resend-reg-confirmation/email
     * @secure
     */
    resendRegNotification: (personId: string, params: RequestParams = {}) =>
      this.request<ActionResult, ActionResult | ProblemDetails>({
        path: `/person/${personId}/resend-reg-confirmation/email`,
        method: "POST",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Person
     * @name ResendRegNotificationSms
     * @summary Resends the registration confirmation notification via SMS for a specified person.
     * @request POST:/person/{personId}/resend-reg-confirmation/sms
     * @secure
     */
    resendRegNotificationSms: (personId: string, params: RequestParams = {}) =>
      this.request<ActionResult, ActionResult | ProblemDetails>({
        path: `/person/${personId}/resend-reg-confirmation/sms`,
        method: "POST",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Person
     * @name SendMessage
     * @summary Sends a message based on the specified query parameters.
     * @request POST:/person/sendmessage
     * @secure
     */
    sendMessage: (
      query: {
        /** @minLength 1 */
        personId: string;
        title?: string | null;
        /** @minLength 1 */
        message: string;
        method?: MessageSenderMethod | null;
      },
      params: RequestParams = {},
    ) =>
      this.request<ActionResult, ActionResult | ProblemDetails>({
        path: `/person/sendmessage`,
        method: "POST",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Person
     * @name AddDailyReports
     * @summary Adds a new daily report for the specified person.
     * @request POST:/person/{personId}/daily-reports/add
     * @secure
     */
    addDailyReports: (
      personId: string,
      data: {
        /** The name of the file to be added as a daily report. */
        fileName: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<PresignedPost, PresignedPost | ProblemDetails>({
        path: `/person/${personId}/daily-reports/add`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Person
     * @name GetAllDailyReports
     * @summary Retrieves all daily reports for the specified person.
     * @request GET:/person/{personId}/daily-reports/all
     * @secure
     */
    getAllDailyReports: (personId: string, params: RequestParams = {}) =>
      this.request<DocumentFileResponse[], ProblemDetails>({
        path: `/person/${personId}/daily-reports/all`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Person
     * @name DeleteDailyReport
     * @request DELETE:/person/{personId}/daily-reports/{documentId}/delete
     * @secure
     */
    deleteDailyReport: (
      personId: string,
      documentId: string,
      params: RequestParams = {},
    ) =>
      this.request<ActionResult, ProblemDetails>({
        path: `/person/${personId}/daily-reports/${documentId}/delete`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Person
     * @name GetByNameAndDob
     * @summary Searches for persons by first name, last name, and optionally date of birth.
     * @request GET:/person/search-by-name/{firstName}/{lastName}/{dob}
     * @secure
     */
    getByNameAndDob: (
      firstName: string,
      lastName: string,
      dob: string,
      query?: {
        sortBy?: string;
        /** @format int32 */
        sortDirection?: number;
        isAscSort?: boolean;
        /** @format int32 */
        page?: number;
        /** @format int32 */
        pageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<CoveredPersonAutocompleteResponse[], ProblemDetails>({
        path: `/person/search-by-name/${firstName}/${lastName}/${dob}`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Person
     * @name Search
     * @summary Searches for persons based on various criteria including roles and creation date.
     * @request GET:/person/search/{searchText}
     * @secure
     */
    search: (
      searchText: string,
      query?: {
        roles?: string[];
        /** @format date */
        createdAfterDate?: string;
        sortBy?: string;
        /** @format int32 */
        sortDirection?: number;
        isAscSort?: boolean;
        /** @format int32 */
        page?: number;
        /** @format int32 */
        pageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<PersonResponse[], ProblemDetails>({
        path: `/person/search/${searchText}`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Person
     * @name Autocomplete
     * @summary Provides autocomplete suggestions for persons based on search text and optional role.
     * @request GET:/person/autocomplete/{searchText}/{role}
     * @secure
     */
    autocomplete: (
      searchText: string,
      role: string,
      params: RequestParams = {},
    ) =>
      this.request<CoveredPersonAutocompleteResponse[], ProblemDetails>({
        path: `/person/autocomplete/${searchText}/${role}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Person
     * @name GetBySharedHorse
     * @summary Retrieves persons associated with a shared horse.
     * @request GET:/person/search-by-shared-horse/{hisaHorseId}
     * @secure
     */
    getBySharedHorse: (hisaHorseId: string, params: RequestParams = {}) =>
      this.request<CoveredPersonAutocompleteResponse[], ProblemDetails>({
        path: `/person/search-by-shared-horse/${hisaHorseId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Person
     * @name FindByPersonIDs
     * @summary Finds persons by their unique IDs.
     * @request POST:/person/find-by-ids
     * @secure
     */
    findByPersonIDs: (data: string[], params: RequestParams = {}) =>
      this.request<PersonResponse[], PersonResponse[] | ProblemDetails>({
        path: `/person/find-by-ids`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Person
     * @name GetByJockeyAgentIdAsync
     * @summary Retrieves persons associated with a specific jockey agent.
     * @request GET:/person/{personId}/by-jockey-agent
     * @secure
     */
    getByJockeyAgentIdAsync: (
      personId: string,
      query?: {
        sortBy?: string;
        /** @format int32 */
        sortDirection?: number;
        isAscSort?: boolean;
        /** @format int32 */
        page?: number;
        /** @format int32 */
        pageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<PersonResponse[], ProblemDetails>({
        path: `/person/${personId}/by-jockey-agent`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Person
     * @name GetPersonsByRoles
     * @summary Retrieves persons with specific roles.
     * @request POST:/person/get-persons-by-roles
     * @secure
     */
    getPersonsByRoles: (
      data: string[],
      query?: {
        sortBy?: string;
        /** @format int32 */
        sortDirection?: number;
        isAscSort?: boolean;
        /** @format int32 */
        page?: number;
        /** @format int32 */
        pageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<PersonResponse[], PersonResponse[] | ProblemDetails>({
        path: `/person/get-persons-by-roles`,
        method: "POST",
        query: query,
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Person
     * @name GetPersonsConcusionAndPsyhical
     * @summary Retrieves jockeys with concussion and physical information.
     * @request POST:/person/get-persons-concusion-and-psyhical
     * @secure
     */
    getPersonsConcusionAndPsyhical: (params: RequestParams = {}) =>
      this.request<PersonResponse[], PersonResponse[] | ProblemDetails>({
        path: `/person/get-persons-concusion-and-psyhical`,
        method: "POST",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Person
     * @name GetByHorseIdAllJockeys
     * @summary Retrieves the history of jockeys associated with a specific horse.
     * @request GET:/person/history/search-jockey-by-horse/{horseId}
     * @secure
     */
    getByHorseIdAllJockeys: (
      horseId: string,
      query?: {
        sortBy?: string;
        /** @format int32 */
        sortDirection?: number;
        isAscSort?: boolean;
        /** @format int32 */
        page?: number;
        /** @format int32 */
        pageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<PersonHistorySearchResponse[], ProblemDetails>({
        path: `/person/history/search-jockey-by-horse/${horseId}`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Person
     * @name GetAllResponsiblePersonesByLocation
     * @summary Retrieves responsible persons for a specific location.
     * @request POST:/person/history/search-responsible-persones-by-location/{locationId}
     * @secure
     */
    getAllResponsiblePersonesByLocation: (
      locationId: string,
      query?: {
        sortBy?: string;
        /** @format int32 */
        sortDirection?: number;
        isAscSort?: boolean;
        /** @format int32 */
        page?: number;
        /** @format int32 */
        pageSize?: number;
        /**
         * The date to filter responsible persons by.
         * @format date
         */
        dateToSearch?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        PersonHistorySearchResponse[],
        PersonHistorySearchResponse[] | ProblemDetails
      >({
        path: `/person/history/search-responsible-persones-by-location/${locationId}`,
        method: "POST",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Person
     * @name FindPersonsNamesByPersonIDs
     * @summary Finds names of persons by their unique IDs.
     * @request POST:/person/find-names-by-ids
     * @secure
     */
    findPersonsNamesByPersonIDs: (data: string[], params: RequestParams = {}) =>
      this.request<
        PersonNameSearchResponse[],
        PersonNameSearchResponse[] | ProblemDetails
      >({
        path: `/person/find-names-by-ids`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Person
     * @name GetPersonsIdsByListOfRoles
     * @summary Retrieves person IDs based on a list of roles.
     * @request POST:/person/get-persons-ids-by-list-of-roles
     * @secure
     */
    getPersonsIdsByListOfRoles: (data: string[], params: RequestParams = {}) =>
      this.request<string[], string[] | ProblemDetails>({
        path: `/person/get-persons-ids-by-list-of-roles`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Person
     * @name CheckPersonSecurityGroup
     * @summary Checks the security group for a specific person.
     * @request GET:/person/check-security-group
     * @secure
     */
    checkPersonSecurityGroup: (
      query?: {
        /** The ID of the person to check. */
        personId?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<PersonCredentialsResponse, ProblemDetails>({
        path: `/person/check-security-group`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Person
     * @name AddVetLicense
     * @summary Adds a veterinarian license for a specific person.
     * @request POST:/person/{personId}/vet-license/add
     * @secure
     */
    addVetLicense: (
      personId: string,
      data: {
        /** The license number to be added. */
        license: string;
        /** The state associated with the license. */
        state: string;
        /**
         * The file containing the license document.
         * @format binary
         */
        file?: File;
      },
      params: RequestParams = {},
    ) =>
      this.request<StateLicenseId, StateLicenseId | ProblemDetails>({
        path: `/person/${personId}/vet-license/add`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Person
     * @name GetVetLicenseUrl
     * @summary Retrieves the URL of a veterinarian license for a specific person and state.
     * @request GET:/person/{personId}/vet-license/{state}/get-url
     * @secure
     */
    getVetLicenseUrl: (
      personId: string,
      state: string,
      params: RequestParams = {},
    ) =>
      this.request<PersonVetLicenseUrlResponse, ProblemDetails>({
        path: `/person/${personId}/vet-license/${state}/get-url`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Person
     * @name DeleteVetLicense
     * @summary Deletes a veterinarian license for a specific person and state.
     * @request DELETE:/person/{personId}/vet-license/{state}
     * @secure
     */
    deleteVetLicense: (
      personId: string,
      state: string,
      params: RequestParams = {},
    ) =>
      this.request<ActionResult, void | ProblemDetails>({
        path: `/person/${personId}/vet-license/${state}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags PersonInviteJockey
     * @name InviteJockeyToBecomeHisAgent
     * @request POST:/person/jockey-agent/invite-jockey
     * @secure
     */
    inviteJockeyToBecomeHisAgent: (
      data: JockeyAgentInviteJockeyCommand,
      params: RequestParams = {},
    ) =>
      this.request<ActionResult, ActionResult | ProblemDetails>({
        path: `/person/jockey-agent/invite-jockey`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags PersonInviteJockey
     * @name Accept
     * @request PUT:/person/jockey-agent/invite-jockey/accept
     * @secure
     */
    accept: (
      data: JockeyAgentInviteJockeyAcceptCommand,
      params: RequestParams = {},
    ) =>
      this.request<ActionResult, ProblemDetails>({
        path: `/person/jockey-agent/invite-jockey/accept`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags PersonInviteJockey
     * @name Reject
     * @request PUT:/person/jockey-agent/invite-jockey/reject
     * @secure
     */
    reject: (
      data: JockeyAgentInviteJockeyRejectCommand,
      params: RequestParams = {},
    ) =>
      this.request<ActionResult, ProblemDetails>({
        path: `/person/jockey-agent/invite-jockey/reject`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  reports = {
    /**
     * @description <br/><br/>Permission validation attribute: AuthorizePropertyAttribute<br/><br/>Validation descriptions:<br/><br/>Required permissions: report:post-layoff:admin<br/><br/>Field under validation: AdminNotes<br/><br/><br/><br/>
     *
     * @tags PostLayoffReports
     * @name Create
     * @request POST:/reports/post-layoff
     * @secure
     */
    create: (data: PostLayoffReportCreateRequest, params: RequestParams = {}) =>
      this.request<
        PostLayoffReportResponse,
        PostLayoffReportResponse | ProblemDetails
      >({
        path: `/reports/post-layoff`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description <br/><br/>Permission validation attribute: AuthorizePropertyAttribute<br/><br/>Validation descriptions:<br/><br/>Required permissions: report:post-layoff:admin<br/><br/>Field under validation: AdminNotes<br/><br/><br/><br/>
     *
     * @tags PostLayoffReports
     * @name Update
     * @request PUT:/reports/post-layoff
     * @secure
     */
    update: (data: PostLayoffReportUpdateRequest, params: RequestParams = {}) =>
      this.request<PostLayoffReportResponse, ProblemDetails>({
        path: `/reports/post-layoff`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags PostLayoffReports
     * @name DeleteAsync
     * @request DELETE:/reports/post-layoff/{reportId}
     * @secure
     */
    deleteAsync: (reportId: string, params: RequestParams = {}) =>
      this.request<IActionResult, ProblemDetails>({
        path: `/reports/post-layoff/${reportId}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description <br/><br/>Permission validation attribute: AuthorizePropertyAttribute<br/><br/>Validation descriptions:<br/><br/>Required permissions: report:post-layoff:admin<br/><br/>Field under validation: AdminNotes<br/><br/><br/><br/>
     *
     * @tags PostLayoffReports
     * @name Get
     * @request GET:/reports/post-layoff/{reportId}
     * @secure
     */
    get: (reportId: string, params: RequestParams = {}) =>
      this.request<PostLayoffReportResponse, ProblemDetails>({
        path: `/reports/post-layoff/${reportId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags PostLayoffReports
     * @name RestoreAsync
     * @request POST:/reports/post-layoff/{reportId}/restore
     * @secure
     */
    restoreAsync: (reportId: string, params: RequestParams = {}) =>
      this.request<IActionResult, IActionResult | ProblemDetails>({
        path: `/reports/post-layoff/${reportId}/restore`,
        method: "POST",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags PostLayoffReports
     * @name UpdateStatus
     * @request PUT:/reports/post-layoff/{reportId}/status
     * @secure
     */
    updateStatus: (
      reportId: string,
      data: PostLayoffReportStatusUpdateRequest,
      params: RequestParams = {},
    ) =>
      this.request<IActionResult, ProblemDetails>({
        path: `/reports/post-layoff/${reportId}/status`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags PostLayoffReports
     * @name AdminPatch
     * @request PATCH:/reports/post-layoff/{reportId}/admin
     * @secure
     */
    adminPatch: (
      reportId: string,
      data: PostLayoffReportAdminUpdateRequest,
      params: RequestParams = {},
    ) =>
      this.request<IActionResult, ProblemDetails>({
        path: `/reports/post-layoff/${reportId}/admin`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags PostLayoffReports
     * @name IntendedRaceUpdate
     * @request PATCH:/reports/post-layoff/{reportId}/intended-race
     * @secure
     */
    intendedRaceUpdate: (
      reportId: string,
      data: PostLayoffReportIntendedRaceUpdateRequest,
      params: RequestParams = {},
    ) =>
      this.request<IActionResult, ProblemDetails>({
        path: `/reports/post-layoff/${reportId}/intended-race`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags PostLayoffReports
     * @name AddDocument
     * @request POST:/reports/post-layoff/{reportId}/documents
     * @secure
     */
    addDocument: (
      reportId: string,
      data: {
        fileName: string;
        /** @default "" */
        personId?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        PresignedPostResponse,
        PresignedPostResponse | ProblemDetails
      >({
        path: `/reports/post-layoff/${reportId}/documents`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags PostLayoffReports
     * @name GetDocuments
     * @request GET:/reports/post-layoff/{reportId}/documents
     * @secure
     */
    getDocuments: (reportId: string, params: RequestParams = {}) =>
      this.request<DocumentFileResponse[], ProblemDetails>({
        path: `/reports/post-layoff/${reportId}/documents`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags PostLayoffReports
     * @name GetDocumentsBatch
     * @request POST:/reports/post-layoff/documents/batch
     * @secure
     */
    getDocumentsBatch: (data: string[], params: RequestParams = {}) =>
      this.request<
        DocumentFileListResponse[],
        DocumentFileListResponse[] | ProblemDetails
      >({
        path: `/reports/post-layoff/documents/batch`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags PostLayoffReports
     * @name DeleteDocumentAsync
     * @request DELETE:/reports/post-layoff/{reportId}/documents/{documentId}
     * @secure
     */
    deleteDocumentAsync: (
      reportId: string,
      documentId: string,
      params: RequestParams = {},
    ) =>
      this.request<IActionResult, ProblemDetails>({
        path: `/reports/post-layoff/${reportId}/documents/${documentId}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags PostLayoffReports
     * @name GetByPerson
     * @request GET:/reports/post-layoff/submitters/{personId}/reports
     * @secure
     */
    getByPerson: (
      personId: string,
      query?: {
        statuses?: PostLayoffReportStatus[];
        persons?: string[];
        horses?: string[];
        includeHidden?: boolean;
        includeDeleted?: boolean;
        searchText?: string;
        /** @format date-time */
        startDate?: string;
        /** @format date-time */
        endDate?: string;
        sortBy?: string;
        /** @format int32 */
        sortDirection?: number;
        isAscSort?: boolean;
        /** @format int32 */
        page?: number;
        /** @format int32 */
        pageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<PostLayoffReportSearchResponse[], ProblemDetails>({
        path: `/reports/post-layoff/submitters/${personId}/reports`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags PostLayoffReports
     * @name GetByHorse
     * @request GET:/reports/post-layoff/horses/{horseId}/reports
     * @secure
     */
    getByHorse: (
      horseId: string,
      query?: {
        statuses?: PostLayoffReportStatus[];
        persons?: string[];
        horses?: string[];
        includeHidden?: boolean;
        includeDeleted?: boolean;
        searchText?: string;
        /** @format date-time */
        startDate?: string;
        /** @format date-time */
        endDate?: string;
        sortBy?: string;
        /** @format int32 */
        sortDirection?: number;
        isAscSort?: boolean;
        /** @format int32 */
        page?: number;
        /** @format int32 */
        pageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<PostLayoffReportSearchResponse[], ProblemDetails>({
        path: `/reports/post-layoff/horses/${horseId}/reports`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags PostLayoffReports
     * @name GetByRegVet
     * @request GET:/reports/post-layoff/review/{personId}/reports
     * @secure
     */
    getByRegVet: (
      personId: string,
      query?: {
        statuses?: PostLayoffReportStatus[];
        persons?: string[];
        horses?: string[];
        includeHidden?: boolean;
        includeDeleted?: boolean;
        searchText?: string;
        /** @format date-time */
        startDate?: string;
        /** @format date-time */
        endDate?: string;
        sortBy?: string;
        /** @format int32 */
        sortDirection?: number;
        isAscSort?: boolean;
        /** @format int32 */
        page?: number;
        /** @format int32 */
        pageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<PostLayoffReportSearchResponse[], ProblemDetails>({
        path: `/reports/post-layoff/review/${personId}/reports`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags PostLayoffReports
     * @name SearchAsync
     * @request GET:/reports/post-layoff/search
     * @secure
     */
    searchAsync: (
      query?: {
        statuses?: PostLayoffReportStatus[];
        persons?: string[];
        horses?: string[];
        includeHidden?: boolean;
        includeDeleted?: boolean;
        searchText?: string;
        /** @format date-time */
        startDate?: string;
        /** @format date-time */
        endDate?: string;
        sortBy?: string;
        /** @format int32 */
        sortDirection?: number;
        isAscSort?: boolean;
        /** @format int32 */
        page?: number;
        /** @format int32 */
        pageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<PostLayoffReportSearchResponse[], ProblemDetails>({
        path: `/reports/post-layoff/search`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags PostLayoffReports
     * @name SearchAdvancedAsync
     * @request GET:/reports/post-layoff/search/advanced
     * @secure
     */
    searchAdvancedAsync: (
      query?: {
        statuses?: PostLayoffReportStatus[];
        persons?: string[];
        horses?: string[];
        includeHidden?: boolean;
        includeDeleted?: boolean;
        searchText?: string;
        /** @format date-time */
        startDate?: string;
        /** @format date-time */
        endDate?: string;
        sortBy?: string;
        /** @format int32 */
        sortDirection?: number;
        isAscSort?: boolean;
        /** @format int32 */
        page?: number;
        /** @format int32 */
        pageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<PostLayoffReportAdvancedSearchResponse[], ProblemDetails>({
        path: `/reports/post-layoff/search/advanced`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags PostLayoffReports
     * @name GetAssociatedRecords
     * @request GET:/reports/post-layoff/{reportId}/associated-records
     * @secure
     */
    getAssociatedRecords: (reportId: string, params: RequestParams = {}) =>
      this.request<PostLayoffReportAssociatedRecordsResponse, ProblemDetails>({
        path: `/reports/post-layoff/${reportId}/associated-records`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags RtrReports
     * @name CreateReport
     * @request POST:/reports/ready-to-run
     * @secure
     */
    createReport: (data: RtrReportCreateRequest, params: RequestParams = {}) =>
      this.request<RtrReportResponse, RtrReportResponse | ProblemDetails>({
        path: `/reports/ready-to-run`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags RtrReports
     * @name GetReport
     * @request GET:/reports/ready-to-run/{reportId}
     * @secure
     */
    getReport: (reportId: string, params: RequestParams = {}) =>
      this.request<RtrReportResponse, ProblemDetails>({
        path: `/reports/ready-to-run/${reportId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags RtrReports
     * @name UpdateLocation
     * @request PATCH:/reports/ready-to-run/{reportId}/location
     * @secure
     */
    updateLocation: (
      reportId: string,
      data: RtrReportLocationUpdateRequest,
      params: RequestParams = {},
    ) =>
      this.request<IActionResult, ProblemDetails>({
        path: `/reports/ready-to-run/${reportId}/location`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags RtrReports
     * @name UpdateRp
     * @request PATCH:/reports/ready-to-run/{reportId}/responsible-person
     * @secure
     */
    updateRp: (
      reportId: string,
      data: RtrReportRpUpdateRequest,
      params: RequestParams = {},
    ) =>
      this.request<IActionResult, ProblemDetails>({
        path: `/reports/ready-to-run/${reportId}/responsible-person`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags RtrReports
     * @name UpdateAttendingVet
     * @request PATCH:/reports/ready-to-run/{reportId}/attending-vet
     * @secure
     */
    updateAttendingVet: (
      reportId: string,
      data: RtrReportAttendingVetUpdateRequest,
      params: RequestParams = {},
    ) =>
      this.request<IActionResult, ProblemDetails>({
        path: `/reports/ready-to-run/${reportId}/attending-vet`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags RtrReports
     * @name UpdateIntendedRace
     * @request PATCH:/reports/ready-to-run/{reportId}/intended-race
     * @secure
     */
    updateIntendedRace: (
      reportId: string,
      data: RtrReportRaceEntryUpdateRequest,
      params: RequestParams = {},
    ) =>
      this.request<IActionResult, ProblemDetails>({
        path: `/reports/ready-to-run/${reportId}/intended-race`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags RtrReports
     * @name UpdateLayoffReason
     * @request PATCH:/reports/ready-to-run/{reportId}/layoff-reason
     * @secure
     */
    updateLayoffReason: (
      reportId: string,
      data: RtrReportLayoffReasonUpdateRequest,
      params: RequestParams = {},
    ) =>
      this.request<IActionResult, ProblemDetails>({
        path: `/reports/ready-to-run/${reportId}/layoff-reason`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags RtrReports
     * @name UpdateRpSubmissionNotes
     * @request PATCH:/reports/ready-to-run/{reportId}/submission-notes/responsible-person
     * @secure
     */
    updateRpSubmissionNotes: (
      reportId: string,
      data: RtrReportSubmissionNotesUpdateRequest,
      params: RequestParams = {},
    ) =>
      this.request<IActionResult, ProblemDetails>({
        path: `/reports/ready-to-run/${reportId}/submission-notes/responsible-person`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags RtrReports
     * @name UpdateAttendingVetSubmissionNotes
     * @request PATCH:/reports/ready-to-run/{reportId}/submission-notes/attending-vet
     * @secure
     */
    updateAttendingVetSubmissionNotes: (
      reportId: string,
      data: RtrReportSubmissionNotesUpdateRequest,
      params: RequestParams = {},
    ) =>
      this.request<IActionResult, ProblemDetails>({
        path: `/reports/ready-to-run/${reportId}/submission-notes/attending-vet`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags RtrReports
     * @name ApproveSubmissionRp
     * @request POST:/reports/ready-to-run/{reportId}/responsible-person/approve
     * @secure
     */
    approveSubmissionRp: (reportId: string, params: RequestParams = {}) =>
      this.request<IActionResult, IActionResult | ProblemDetails>({
        path: `/reports/ready-to-run/${reportId}/responsible-person/approve`,
        method: "POST",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags RtrReports
     * @name RemoveSubmissionApprovalRp
     * @request DELETE:/reports/ready-to-run/{reportId}/responsible-person/approve
     * @secure
     */
    removeSubmissionApprovalRp: (
      reportId: string,
      params: RequestParams = {},
    ) =>
      this.request<IActionResult, ProblemDetails>({
        path: `/reports/ready-to-run/${reportId}/responsible-person/approve`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags RtrReports
     * @name ApproveSubmissionAttendingVet
     * @request POST:/reports/ready-to-run/{reportId}/attending-vet/approve
     * @secure
     */
    approveSubmissionAttendingVet: (
      reportId: string,
      params: RequestParams = {},
    ) =>
      this.request<IActionResult, IActionResult | ProblemDetails>({
        path: `/reports/ready-to-run/${reportId}/attending-vet/approve`,
        method: "POST",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags RtrReports
     * @name RemoveSubmissionApprovalAttendingVet
     * @request DELETE:/reports/ready-to-run/{reportId}/attending-vet/approve
     * @secure
     */
    removeSubmissionApprovalAttendingVet: (
      reportId: string,
      params: RequestParams = {},
    ) =>
      this.request<IActionResult, ProblemDetails>({
        path: `/reports/ready-to-run/${reportId}/attending-vet/approve`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags RtrReports
     * @name ChangeType
     * @request PATCH:/reports/ready-to-run/{reportId}/type
     * @secure
     */
    changeType: (
      reportId: string,
      data: RtrReportTypeChangeRequest,
      params: RequestParams = {},
    ) =>
      this.request<IActionResult, ProblemDetails>({
        path: `/reports/ready-to-run/${reportId}/type`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags RtrReports
     * @name SubmitReport
     * @request POST:/reports/ready-to-run/{reportId}/submit
     * @secure
     */
    submitReport: (reportId: string, params: RequestParams = {}) =>
      this.request<IActionResult, IActionResult | ProblemDetails>({
        path: `/reports/ready-to-run/${reportId}/submit`,
        method: "POST",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags RtrReports
     * @name StartReview
     * @request POST:/reports/ready-to-run/{reportId}/start-review
     * @secure
     */
    startReview: (reportId: string, params: RequestParams = {}) =>
      this.request<IActionResult, IActionResult | ProblemDetails>({
        path: `/reports/ready-to-run/${reportId}/start-review`,
        method: "POST",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags RtrReports
     * @name ResumeReview
     * @request POST:/reports/ready-to-run/{reportId}/resume-review
     * @secure
     */
    resumeReview: (reportId: string, params: RequestParams = {}) =>
      this.request<IActionResult, IActionResult | ProblemDetails>({
        path: `/reports/ready-to-run/${reportId}/resume-review`,
        method: "POST",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags RtrReports
     * @name StartDiscussion
     * @request POST:/reports/ready-to-run/{reportId}/start-discussion
     * @secure
     */
    startDiscussion: (reportId: string, params: RequestParams = {}) =>
      this.request<IActionResult, IActionResult | ProblemDetails>({
        path: `/reports/ready-to-run/${reportId}/start-discussion`,
        method: "POST",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags RtrReports
     * @name GetDiscussion
     * @request GET:/reports/ready-to-run/{reportId}/discussion
     * @secure
     */
    getDiscussion: (reportId: string, params: RequestParams = {}) =>
      this.request<RtrDiscussionResponse, ProblemDetails>({
        path: `/reports/ready-to-run/${reportId}/discussion`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags RtrReports
     * @name Reject
     * @request POST:/reports/ready-to-run/{reportId}/reject
     * @secure
     */
    reject: (reportId: string, params: RequestParams = {}) =>
      this.request<IActionResult, IActionResult | ProblemDetails>({
        path: `/reports/ready-to-run/${reportId}/reject`,
        method: "POST",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags RtrReports
     * @name Complete
     * @request POST:/reports/ready-to-run/{reportId}/complete
     * @secure
     */
    complete: (reportId: string, params: RequestParams = {}) =>
      this.request<IActionResult, IActionResult | ProblemDetails>({
        path: `/reports/ready-to-run/${reportId}/complete`,
        method: "POST",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags RtrReports
     * @name StartScheduling
     * @request POST:/reports/ready-to-run/{reportId}/start-scheduling
     * @secure
     */
    startScheduling: (reportId: string, params: RequestParams = {}) =>
      this.request<IActionResult, IActionResult | ProblemDetails>({
        path: `/reports/ready-to-run/${reportId}/start-scheduling`,
        method: "POST",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags RtrReports
     * @name ScheduleWorkOff
     * @request POST:/reports/ready-to-run/{reportId}/schedule
     * @secure
     */
    scheduleWorkOff: (
      reportId: string,
      data: RtrWorkOffScheduleRequest,
      params: RequestParams = {},
    ) =>
      this.request<IActionResult, IActionResult | ProblemDetails>({
        path: `/reports/ready-to-run/${reportId}/schedule`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags RtrReports
     * @name SetWorkOffResults
     * @request POST:/reports/ready-to-run/{reportId}/work-off-results
     * @secure
     */
    setWorkOffResults: (
      reportId: string,
      data: RtrWorkOffResultsUpdateRequest,
      params: RequestParams = {},
    ) =>
      this.request<IActionResult, IActionResult | ProblemDetails>({
        path: `/reports/ready-to-run/${reportId}/work-off-results`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags RtrReports
     * @name FailReport
     * @request POST:/reports/ready-to-run/{reportId}/fail
     * @secure
     */
    failReport: (
      reportId: string,
      data: RtrFailureReasonsUpdateRequest,
      params: RequestParams = {},
    ) =>
      this.request<IActionResult, IActionResult | ProblemDetails>({
        path: `/reports/ready-to-run/${reportId}/fail`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags RtrReports
     * @name SetFailureReasons
     * @request PATCH:/reports/ready-to-run/{reportId}/failure-reasons
     * @secure
     */
    setFailureReasons: (
      reportId: string,
      data: RtrFailureReasonsUpdateRequest,
      params: RequestParams = {},
    ) =>
      this.request<IActionResult, ProblemDetails>({
        path: `/reports/ready-to-run/${reportId}/failure-reasons`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags RtrReports
     * @name GetSummary
     * @request GET:/reports/ready-to-run/{reportId}/summary
     * @secure
     */
    getSummary: (reportId: string, params: RequestParams = {}) =>
      this.request<RtrReportMedicalSummaryResponse, ProblemDetails>({
        path: `/reports/ready-to-run/${reportId}/summary`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags RtrReports
     * @name AddDocument2
     * @request POST:/reports/ready-to-run/{reportId}/documents
     * @originalName addDocument
     * @duplicate
     * @secure
     */
    addDocument2: (
      reportId: string,
      data: {
        fileName: string;
        /** @default "" */
        personId?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        PresignedPostResponse,
        PresignedPostResponse | ProblemDetails
      >({
        path: `/reports/ready-to-run/${reportId}/documents`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags RtrReports
     * @name GetDocuments2
     * @request GET:/reports/ready-to-run/{reportId}/documents
     * @originalName getDocuments
     * @duplicate
     * @secure
     */
    getDocuments2: (reportId: string, params: RequestParams = {}) =>
      this.request<DocumentFileResponse[], ProblemDetails>({
        path: `/reports/ready-to-run/${reportId}/documents`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags RtrReports
     * @name GetWorkOffReasons
     * @request GET:/reports/ready-to-run/work-off/reasons
     * @secure
     */
    getWorkOffReasons: (params: RequestParams = {}) =>
      this.request<AssortedFieldSearchDto[], ProblemDetails>({
        path: `/reports/ready-to-run/work-off/reasons`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags RtrReports
     * @name GetDocumentsBatch2
     * @request POST:/reports/ready-to-run/documents/batch
     * @originalName getDocumentsBatch
     * @duplicate
     * @secure
     */
    getDocumentsBatch2: (data: string[], params: RequestParams = {}) =>
      this.request<
        DocumentFileListResponse[],
        DocumentFileListResponse[] | ProblemDetails
      >({
        path: `/reports/ready-to-run/documents/batch`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags RtrReports
     * @name DeleteDocumentAsync2
     * @request DELETE:/reports/ready-to-run/{reportId}/documents/{documentId}
     * @originalName deleteDocumentAsync
     * @duplicate
     * @secure
     */
    deleteDocumentAsync2: (
      reportId: string,
      documentId: string,
      params: RequestParams = {},
    ) =>
      this.request<IActionResult, ProblemDetails>({
        path: `/reports/ready-to-run/${reportId}/documents/${documentId}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags TrackMeetReport
     * @name CreateReport2
     * @summary Create a Track Meet Report.
     * @request POST:/reports/track-meet
     * @originalName createReport
     * @duplicate
     * @secure
     */
    createReport2: (
      data: TrackMeetReportCreateRequest,
      params: RequestParams = {},
    ) =>
      this.request<
        TrackMeetReportResponse,
        TrackMeetReportResponse | ProblemDetails
      >({
        path: `/reports/track-meet`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags TrackMeetReport
     * @name UpdateReport
     * @summary Update a Track Meet Report.
     * @request PUT:/reports/track-meet/{reportId}
     * @secure
     */
    updateReport: (
      reportId: string,
      data: TrackMeetReportUpdateRequest,
      params: RequestParams = {},
    ) =>
      this.request<TrackMeetReportResponse, ProblemDetails>({
        path: `/reports/track-meet/${reportId}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags TrackMeetReport
     * @name GetReport2
     * @summary Retrieves a Track Meet Report by its unique ID.
     * @request GET:/reports/track-meet/{reportId}
     * @originalName getReport
     * @duplicate
     * @secure
     */
    getReport2: (reportId: string, params: RequestParams = {}) =>
      this.request<TrackMeetReportResponse, ProblemDetails>({
        path: `/reports/track-meet/${reportId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags TrackMeetReport
     * @name DeleteReport
     * @summary Deletes Track Meet Reports by report ID.
     * @request DELETE:/reports/track-meet/{reportId}
     * @secure
     */
    deleteReport: (reportId: string, params: RequestParams = {}) =>
      this.request<IActionResult, ProblemDetails>({
        path: `/reports/track-meet/${reportId}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags TrackMeetReport
     * @name GetAll
     * @summary Retrieves all Track Meet Reports by location ID.
     * @request GET:/reports/track-meet/{locationId}/all
     * @secure
     */
    getAll: (locationId: string, params: RequestParams = {}) =>
      this.request<TrackMeetReportResponse[], ProblemDetails>({
        path: `/reports/track-meet/${locationId}/all`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags TrackMeetReport
     * @name SubmitReport2
     * @summary Submits Track Meet Reports by report ID.
     * @request POST:/reports/track-meet/{reportId}/submit
     * @originalName submitReport
     * @duplicate
     * @secure
     */
    submitReport2: (reportId: string, params: RequestParams = {}) =>
      this.request<IActionResult, IActionResult | ProblemDetails>({
        path: `/reports/track-meet/${reportId}/submit`,
        method: "POST",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags TrackMeetReport
     * @name GenerateTrackMeetReport
     * @summary Generate track meet report word file.
     * @request GET:/reports/track-meet/{reportId}/generate-report
     * @secure
     */
    generateTrackMeetReport: (reportId: string, params: RequestParams = {}) =>
      this.request<IActionResult, ProblemDetails>({
        path: `/reports/track-meet/${reportId}/generate-report`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  publicholiday = {
    /**
     * No description
     *
     * @tags PublicHoliday
     * @name GetById
     * @request GET:/publicholiday/{date}
     * @secure
     */
    getById: (date: string, params: RequestParams = {}) =>
      this.request<PublicHoliday, ProblemDetails>({
        path: `/publicholiday/${date}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags PublicHoliday
     * @name Update
     * @request PUT:/publicholiday/{date}
     * @secure
     */
    update: (date: string, data: PublicHoliday, params: RequestParams = {}) =>
      this.request<PublicHoliday, ProblemDetails>({
        path: `/publicholiday/${date}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags PublicHoliday
     * @name Delete
     * @request DELETE:/publicholiday/{date}
     * @secure
     */
    delete: (date: string, params: RequestParams = {}) =>
      this.request<ActionResult, ProblemDetails>({
        path: `/publicholiday/${date}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags PublicHoliday
     * @name GetAllBetweenDatesAsync
     * @request GET:/publicholiday/get-all-between-dates/{start}/{end}
     * @secure
     */
    getAllBetweenDatesAsync: (
      start: string,
      end: string,
      params: RequestParams = {},
    ) =>
      this.request<PublicHoliday[], ProblemDetails>({
        path: `/publicholiday/get-all-between-dates/${start}/${end}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags PublicHoliday
     * @name Add
     * @request POST:/publicholiday
     * @secure
     */
    add: (data: PublicHoliday, params: RequestParams = {}) =>
      this.request<PublicHoliday, PublicHoliday | ProblemDetails>({
        path: `/publicholiday`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags PublicHoliday
     * @name SetPublicHolidayByYear
     * @request GET:/publicholiday/set-public-holiday-by-year/{startYear}/{endYear}
     * @secure
     */
    setPublicHolidayByYear: (
      startYear: number,
      endYear: number,
      params: RequestParams = {},
    ) =>
      this.request<boolean, ProblemDetails>({
        path: `/publicholiday/set-public-holiday-by-year/${startYear}/${endYear}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  questionnaire = {
    /**
     * No description
     *
     * @tags Questionnaire
     * @name GetAllQuestions
     * @summary Return all questions asigned to Questionnaire by questionnaireId.
     * @request GET:/questionnaire/{questionnaireId}/question/all
     * @secure
     */
    getAllQuestions: (questionnaireId: string, params: RequestParams = {}) =>
      this.request<QuestionResponse[], ProblemDetails>({
        path: `/questionnaire/${questionnaireId}/question/all`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Questionnaire
     * @name GetQuestion
     * @summary Return question by question id and questionnaire id.
     * @request GET:/questionnaire/{questionnaireId}/question/{questionId}
     * @secure
     */
    getQuestion: (
      questionnaireId: string,
      questionId: string,
      params: RequestParams = {},
    ) =>
      this.request<QuestionResponse, ProblemDetails>({
        path: `/questionnaire/${questionnaireId}/question/${questionId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Questionnaire
     * @name UpdateQuestion
     * @summary Update question.
     * @request PUT:/questionnaire/{questionnaireId}/question/{questionId}
     * @secure
     */
    updateQuestion: (
      questionnaireId: string,
      questionId: string,
      data: QuestionRequest,
      params: RequestParams = {},
    ) =>
      this.request<QuestionResponse, ProblemDetails>({
        path: `/questionnaire/${questionnaireId}/question/${questionId}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Questionnaire
     * @name DeleteQuestion
     * @summary Delete question.
     * @request DELETE:/questionnaire/{questionnaireId}/question/{questionId}
     * @secure
     */
    deleteQuestion: (
      questionnaireId: string,
      questionId: string,
      params: RequestParams = {},
    ) =>
      this.request<ActionResult, ProblemDetails>({
        path: `/questionnaire/${questionnaireId}/question/${questionId}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Questionnaire
     * @name UpdateBatchOfQuestions
     * @summary Update batch of questions.
     * @request PUT:/questionnaire/{questionnaireId}/questions
     * @secure
     */
    updateBatchOfQuestions: (
      questionnaireId: string,
      data: QuestionRequest[],
      params: RequestParams = {},
    ) =>
      this.request<ActionResult, ProblemDetails>({
        path: `/questionnaire/${questionnaireId}/questions`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Questionnaire
     * @name CopyBatchOfQuestions
     * @summary Copy batch of questions.
     * @request PUT:/questionnaire/{sourceQuestionnaireId}/{name}/{year}/questions
     * @secure
     */
    copyBatchOfQuestions: (
      sourceQuestionnaireId: string,
      name: string,
      year: string,
      query?: {
        /** Is active. */
        isActive?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<ActionResult, ProblemDetails>({
        path: `/questionnaire/${sourceQuestionnaireId}/${name}/${year}/questions`,
        method: "PUT",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Questionnaire
     * @name InsertQuestion
     * @summary Insert new question.
     * @request POST:/questionnaire/{questionnaireId}/question
     * @secure
     */
    insertQuestion: (
      questionnaireId: string,
      data: QuestionRequest,
      params: RequestParams = {},
    ) =>
      this.request<QuestionResponse, QuestionResponse | ProblemDetails>({
        path: `/questionnaire/${questionnaireId}/question`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Questionnaire
     * @name GetAllQuestionnaire
     * @summary Return all questionnaires.
     * @request GET:/questionnaire
     * @secure
     */
    getAllQuestionnaire: (params: RequestParams = {}) =>
      this.request<QuestionnaireResponse[], ProblemDetails>({
        path: `/questionnaire`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Questionnaire
     * @name InsertQuestionnaire
     * @summary Insert new questionnaire.
     * @request POST:/questionnaire
     * @secure
     */
    insertQuestionnaire: (
      data: QuestionnaireRequest,
      params: RequestParams = {},
    ) =>
      this.request<
        QuestionnaireResponse,
        QuestionnaireResponse | ProblemDetails
      >({
        path: `/questionnaire`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Questionnaire
     * @name GetQuestionnaire
     * @summary Return questionnaire by id.
     * @request GET:/questionnaire/{questionnaireId}
     * @secure
     */
    getQuestionnaire: (questionnaireId: string, params: RequestParams = {}) =>
      this.request<QuestionnaireResponse, ProblemDetails>({
        path: `/questionnaire/${questionnaireId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Questionnaire
     * @name UpdateQuestionnaire
     * @summary Update questionnaire.
     * @request PUT:/questionnaire/{questionnaireId}
     * @secure
     */
    updateQuestionnaire: (
      questionnaireId: string,
      data: QuestionnaireRequest,
      params: RequestParams = {},
    ) =>
      this.request<QuestionnaireResponse, ProblemDetails>({
        path: `/questionnaire/${questionnaireId}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Questionnaire
     * @name DeleteQuestionnaire
     * @summary Delete questionnaire.
     * @request DELETE:/questionnaire/{questionnaireId}
     * @secure
     */
    deleteQuestionnaire: (
      questionnaireId: string,
      params: RequestParams = {},
    ) =>
      this.request<ActionResult, ProblemDetails>({
        path: `/questionnaire/${questionnaireId}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  questionnaireanswer = {
    /**
     * No description
     *
     * @tags QuestionnaireAnswer
     * @name GetById
     * @summary Return QuestionnaireAnswer by questionnaireAnswerId.
     * @request GET:/questionnaireanswer/{questionnaireAnswerId}
     * @secure
     */
    getById: (
      questionnaireAnswerId: string,
      query?: {
        /**
         * Set true if need return deleted.
         * @default false
         */
        withDeleted?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<QuestionnaireAnswerResponse, ProblemDetails>({
        path: `/questionnaireanswer/${questionnaireAnswerId}`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags QuestionnaireAnswer
     * @name Update
     * @summary Update QuestionnaireAnswer.
     * @request PUT:/questionnaireanswer/{questionnaireAnswerId}
     * @secure
     */
    update: (
      questionnaireAnswerId: string,
      data: QuestionnaireAnswerRequest,
      params: RequestParams = {},
    ) =>
      this.request<QuestionnaireAnswerResponse, ProblemDetails>({
        path: `/questionnaireanswer/${questionnaireAnswerId}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags QuestionnaireAnswer
     * @name Delete
     * @summary Delete QuestionnaireAnswer.
     * @request DELETE:/questionnaireanswer/{questionnaireAnswerId}
     * @secure
     */
    delete: (questionnaireAnswerId: string, params: RequestParams = {}) =>
      this.request<ActionResult, ProblemDetails>({
        path: `/questionnaireanswer/${questionnaireAnswerId}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags QuestionnaireAnswer
     * @name Add
     * @summary Insert new QuestionnaireAnswer.
     * @request POST:/questionnaireanswer
     * @secure
     */
    add: (data: QuestionnaireAnswerRequest, params: RequestParams = {}) =>
      this.request<
        QuestionnaireAnswerResponse,
        QuestionnaireAnswerResponse | ProblemDetails
      >({
        path: `/questionnaireanswer`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags QuestionnaireAnswer
     * @name GetAll
     * @summary Return all QuestionnaireAnswers.
     * @request GET:/questionnaireanswer
     * @secure
     */
    getAll: (
      query?: {
        sortBy?: string;
        /** @format int32 */
        sortDirection?: number;
        isAscSort?: boolean;
        /** @format int32 */
        page?: number;
        /** @format int32 */
        pageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<QuestionnaireAnswerResponse[], ProblemDetails>({
        path: `/questionnaireanswer`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags QuestionnaireAnswer
     * @name Submit
     * @summary Submit QuestionnaireAnswer.
     * @request PUT:/questionnaireanswer/{questionnaireAnswerId}/submit
     * @secure
     */
    submit: (questionnaireAnswerId: string, params: RequestParams = {}) =>
      this.request<ActionResult, ProblemDetails>({
        path: `/questionnaireanswer/${questionnaireAnswerId}/submit`,
        method: "PUT",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags QuestionnaireAnswer
     * @name SendEmail
     * @summary SendEmail by QuestionnaireAnswerId and HisaPersonId.
     * @request PUT:/questionnaireanswer/{questionnaireAnswerId}/{hisaPersonId}/sendemail
     * @secure
     */
    sendEmail: (
      questionnaireAnswerId: string,
      hisaPersonId: string,
      params: RequestParams = {},
    ) =>
      this.request<ActionResult, string | ProblemDetails>({
        path: `/questionnaireanswer/${questionnaireAnswerId}/${hisaPersonId}/sendemail`,
        method: "PUT",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags QuestionnaireAnswer
     * @name Search
     * @summary Search for QuestionnaireAnswers with additional parameter LocationId.
     * @request GET:/questionnaireanswer/questionnaireanswersearch/{locationId}/{searchText}
     * @secure
     */
    search: (
      locationId: string,
      searchText: string,
      query?: {
        sortBy?: string;
        /** @format int32 */
        sortDirection?: number;
        isAscSort?: boolean;
        /** @format int32 */
        page?: number;
        /** @format int32 */
        pageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<QuestionnaireAnswerResponse[], ProblemDetails>({
        path: `/questionnaireanswer/questionnaireanswersearch/${locationId}/${searchText}`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags QuestionnaireAnswer
     * @name SubmitTemp
     * @summary Temporary Submit QuestionnaireAnswer.
     * @request PUT:/questionnaireanswer/{locationId}/submittemp
     * @secure
     */
    submitTemp: (locationId: string, params: RequestParams = {}) =>
      this.request<ActionResult, string | ProblemDetails>({
        path: `/questionnaireanswer/${locationId}/submittemp`,
        method: "PUT",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags QuestionnaireAnswer
     * @name SendReviewNotesReport
     * @summary Send review notes of QuestionnaireAnswer.
     * @request GET:/questionnaireanswer/{questionnaireAnswerId}/send-review-notes-report/with-questionanswerids
     * @secure
     */
    sendReviewNotesReport: (
      questionnaireAnswerId: string,
      params: RequestParams = {},
    ) =>
      this.request<ActionResult, string | ProblemDetails>({
        path: `/questionnaireanswer/${questionnaireAnswerId}/send-review-notes-report/with-questionanswerids`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags QuestionnaireAnswer
     * @name InsertNewQuestionnaireAnswerWithQuestionAnswers
     * @summary Insert new Questionnaire Answer with Question Answers by Questionnaire Id.
     * @request POST:/questionnaireanswer/questionnaire/{questionnaireId}
     * @secure
     */
    insertNewQuestionnaireAnswerWithQuestionAnswers: (
      questionnaireId: string,
      query: {
        userName?: string | null;
        /** @minLength 1 */
        locationId: string;
        /** @minLength 1 */
        personId: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        QuestionnaireAnswerDto,
        QuestionnaireAnswerDto | ProblemDetails
      >({
        path: `/questionnaireanswer/questionnaire/${questionnaireId}`,
        method: "POST",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
 * No description
 *
 * @tags QuestionnaireAnswer
 * @name BatchDeleteQuestionnaireAnswerAndAssignedQuestionAnswer
 * @summary For internal use ONLY! Permanently delete specified data!
Batch Delete Questionnaire Answer with Question Answers by QuestionnaireAnswerId.
 * @request DELETE:/questionnaireanswer/{questionnaireAnswerIdList}/deleteall
 * @secure
 */
    batchDeleteQuestionnaireAnswerAndAssignedQuestionAnswer: (
      questionnaireAnswerIdList: string,
      params: RequestParams = {},
    ) =>
      this.request<ActionResult, ProblemDetails>({
        path: `/questionnaireanswer/${questionnaireAnswerIdList}/deleteall`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags QuestionnaireAnswer
     * @name GeneratePdfFile
     * @summary Generate Questionnaire answers pdf file.
     * @request GET:/questionnaireanswer/{questionnaireAnswerId}/generatepdffile
     * @secure
     */
    generatePdfFile: (
      questionnaireAnswerId: string,
      params: RequestParams = {},
    ) =>
      this.request<ActionResult, ProblemDetails>({
        path: `/questionnaireanswer/${questionnaireAnswerId}/generatepdffile`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags QuestionnaireAnswer
     * @name GeneratePdfFileWithTrackResponses
     * @summary Generate pdf file with track responses.
     * @request GET:/questionnaireanswer/{questionnaireAnswerId}/generate-pdf/track-responses
     * @secure
     */
    generatePdfFileWithTrackResponses: (
      questionnaireAnswerId: string,
      params: RequestParams = {},
    ) =>
      this.request<ActionResult, ProblemDetails>({
        path: `/questionnaireanswer/${questionnaireAnswerId}/generate-pdf/track-responses`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags QuestionnaireAnswer
     * @name Get
     * @request GET:/questionnaireanswer/{questionnaireAnswerId}/generate-rsc-report
     * @deprecated
     * @secure
     */
    get: (
      questionnaireAnswerId: string,
      query?: {
        fieldName?: SortType;
        isAscending?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<IActionResult, ProblemDetails>({
        path: `/questionnaireanswer/${questionnaireAnswerId}/generate-rsc-report`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags QuestionnaireAnswer
     * @name GenerateRscReports
     * @request GET:/questionnaireanswer/{questionnaireAnswerId}/generate-rsc-reports
     * @deprecated
     * @secure
     */
    generateRscReports: (
      questionnaireAnswerId: string,
      query?: {
        reportType?: ReportType;
        fieldName?: SortType;
        isAscending?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<IActionResult, ProblemDetails>({
        path: `/questionnaireanswer/${questionnaireAnswerId}/generate-rsc-reports`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags QuestionnaireAnswer
     * @name GenerateRscReport
     * @summary Generate different types of RSC reports.
     * @request POST:/questionnaireanswer/{questionnaireAnswerId}/generate-report
     * @secure
     */
    generateRscReport: (
      questionnaireAnswerId: string,
      data: QuestionnaireDocumentRequest,
      params: RequestParams = {},
    ) =>
      this.request<IActionResult, IActionResult | ProblemDetails>({
        path: `/questionnaireanswer/${questionnaireAnswerId}/generate-report`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags QuestionnaireAnswer
     * @name GenerateReviewNotesReport
     * @summary Generate review notes report with question answers.
     * @request GET:/questionnaireanswer/{questionnaireAnswerId}/generate-review-notes-report/with-questionanswerids
     * @secure
     */
    generateReviewNotesReport: (
      questionnaireAnswerId: string,
      params: RequestParams = {},
    ) =>
      this.request<IActionResult, ProblemDetails>({
        path: `/questionnaireanswer/${questionnaireAnswerId}/generate-review-notes-report/with-questionanswerids`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags QuestionnaireAnswer
     * @name GenerateCoverLetterWithTrackResponses
     * @summary Generate review notes report with track responses.
     * @request GET:/questionnaireanswer/{questionnaireAnswerId}/generate-cover-letter/with-track-responses
     * @secure
     */
    generateCoverLetterWithTrackResponses: (
      questionnaireAnswerId: string,
      params: RequestParams = {},
    ) =>
      this.request<IActionResult, ProblemDetails>({
        path: `/questionnaireanswer/${questionnaireAnswerId}/generate-cover-letter/with-track-responses`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags QuestionnaireAnswer
     * @name GeneratePreviewCoverLetter
     * @summary Generate cover letter with question answers.
     * @request GET:/questionnaireanswer/{questionnaireAnswerId}/generate-preview-cover-letter/with-questionanswerids
     * @secure
     */
    generatePreviewCoverLetter: (
      questionnaireAnswerId: string,
      params: RequestParams = {},
    ) =>
      this.request<IActionResult, ProblemDetails>({
        path: `/questionnaireanswer/${questionnaireAnswerId}/generate-preview-cover-letter/with-questionanswerids`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags QuestionnaireAnswer
     * @name GeneratePreviewCoverLetterWithTrackResponses
     * @summary Generate cover letter with track responses.
     * @request GET:/questionnaireanswer/{questionnaireAnswerId}/generate-preview-cover-letter/with-track-responses
     * @secure
     */
    generatePreviewCoverLetterWithTrackResponses: (
      questionnaireAnswerId: string,
      params: RequestParams = {},
    ) =>
      this.request<IActionResult, ProblemDetails>({
        path: `/questionnaireanswer/${questionnaireAnswerId}/generate-preview-cover-letter/with-track-responses`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags QuestionnaireAnswer
     * @name AddDocument
     * @summary Attach document to QuestionnaireAnswer.
     * @request POST:/questionnaireanswer/{questionnaireAnswerId}/questionanswer/{questionAnswerId}/document/add-document
     * @secure
     */
    addDocument: (
      questionnaireAnswerId: string,
      questionAnswerId: string,
      data: {
        /** Attachment name. */
        fileName: string;
        /** Year of the accreditation. */
        year: string;
        /** Attachment type. */
        type: LocationFormType;
        /** List of tags type. */
        tags?: string[];
        /**
         * Size of the file.
         * @format int64
         * @default 0
         */
        fileSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<PresignedPost, PresignedPost | ProblemDetails>({
        path: `/questionnaireanswer/${questionnaireAnswerId}/questionanswer/${questionAnswerId}/document/add-document`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags QuestionnaireAnswer
     * @name AddDocumentAssessment
     * @request POST:/questionnaireanswer/{questionnaireAnswerId}/questionanswer/{questionAnswerId}/document/add-document-assessment
     * @secure
     */
    addDocumentAssessment: (
      questionnaireAnswerId: string,
      questionAnswerId: string,
      data: {
        type: LocationFormType;
        fileName: string;
        year: string;
        tags?: string[];
        /**
         * @format int64
         * @default 0
         */
        fileSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<PresignedPost, PresignedPost | ProblemDetails>({
        path: `/questionnaireanswer/${questionnaireAnswerId}/questionanswer/${questionAnswerId}/document/add-document-assessment`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags QuestionnaireAnswer
     * @name GetAllDocuments
     * @summary Return all documents attached to QuestionnaireAnswer by QuestionnaireAnswer questionnaireAnswerId.
     * @request GET:/questionnaireanswer/{questionnaireAnswerId}/document/all-documents
     * @secure
     */
    getAllDocuments: (
      questionnaireAnswerId: string,
      query?: {
        sortBy?: string;
        /** @format int32 */
        sortDirection?: number;
        isAscSort?: boolean;
        /** @format int32 */
        page?: number;
        /** @format int32 */
        pageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<DocumentFileResponse[], ProblemDetails>({
        path: `/questionnaireanswer/${questionnaireAnswerId}/document/all-documents`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags QuestionnaireAnswer
     * @name GetAllDocumentsAssessment
     * @summary Return all assessment documents attached to QuestionnaireAnswer by QuestionnaireAnswer questionnaireAnswerId.
     * @request GET:/questionnaireanswer/{questionnaireAnswerId}/document/all-assessment-documents
     * @secure
     */
    getAllDocumentsAssessment: (
      questionnaireAnswerId: string,
      query?: {
        /**
         * Set true to get all files.
         * @default false
         */
        ifAllFiles?: boolean;
        sortBy?: string;
        /** @format int32 */
        sortDirection?: number;
        isAscSort?: boolean;
        /** @format int32 */
        page?: number;
        /** @format int32 */
        pageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<DocumentFileResponse[], ProblemDetails>({
        path: `/questionnaireanswer/${questionnaireAnswerId}/document/all-assessment-documents`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags QuestionnaireAnswer
     * @name GetSpecifiedDocument
     * @summary Return documents attached to Question Answer by Questionnaire Answer Id and Question Answer Id.
     * @request GET:/questionnaireanswer/{questionnaireAnswerId}/questionanswer/{questionAnswerId}/documents
     * @secure
     */
    getSpecifiedDocument: (
      questionnaireAnswerId: string,
      questionAnswerId: string,
      query?: {
        sortBy?: string;
        /** @format int32 */
        sortDirection?: number;
        isAscSort?: boolean;
        /** @format int32 */
        page?: number;
        /** @format int32 */
        pageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<DocumentFileResponse[], ProblemDetails>({
        path: `/questionnaireanswer/${questionnaireAnswerId}/questionanswer/${questionAnswerId}/documents`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags QuestionnaireAnswer
     * @name DeleteSpecifiedDocument
     * @summary Remove documents attached to QuestionAnswer.
     * @request DELETE:/questionnaireanswer/{questionnaireAnswerId}/questionanswer/{questionAnswerId}/document/{documentId}/delete
     * @secure
     */
    deleteSpecifiedDocument: (
      questionnaireAnswerId: string,
      questionAnswerId: string,
      documentId: string,
      params: RequestParams = {},
    ) =>
      this.request<ActionResult, ProblemDetails>({
        path: `/questionnaireanswer/${questionnaireAnswerId}/questionanswer/${questionAnswerId}/document/${documentId}/delete`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags QuestionnaireAnswer
     * @name QuestionAnswersSearch
     * @summary Search for QuestionAnswers.
     * @request GET:/questionnaireanswer/{questionnaireAnswerId}/questionanswersearch/{searchText}
     * @secure
     */
    questionAnswersSearch: (
      questionnaireAnswerId: string,
      searchText: string,
      query?: {
        sortBy?: string;
        /** @format int32 */
        sortDirection?: number;
        isAscSort?: boolean;
        /** @format int32 */
        page?: number;
        /** @format int32 */
        pageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<QuestionAnswerDto[], ProblemDetails>({
        path: `/questionnaireanswer/${questionnaireAnswerId}/questionanswersearch/${searchText}`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags QuestionnaireAnswer
     * @name GetAllQuestionAnswers
     * @summary Get question answers asigned to QuestionnaireAnswer by questionnaireAnswerId.
     * @request GET:/questionnaireanswer/{questionnaireAnswerId}/questionanswer/all
     * @secure
     */
    getAllQuestionAnswers: (
      questionnaireAnswerId: string,
      query?: {
        sortBy?: string;
        /** @format int32 */
        sortDirection?: number;
        isAscSort?: boolean;
        /** @format int32 */
        page?: number;
        /** @format int32 */
        pageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<QuestionAnswerDto[], ProblemDetails>({
        path: `/questionnaireanswer/${questionnaireAnswerId}/questionanswer/all`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags QuestionnaireAnswer
     * @name GetQuestionAnswer
     * @summary Get question answer by questionAnswerId.
     * @request GET:/questionnaireanswer/{questionnaireAnswerId}/questionanswer/{questionAnswerId}
     * @secure
     */
    getQuestionAnswer: (
      questionnaireAnswerId: string,
      questionAnswerId: string,
      query?: {
        /**
         * Set true if need return deleted.
         * @default false
         */
        withDeleted?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<QuestionAnswerDto, ProblemDetails>({
        path: `/questionnaireanswer/${questionnaireAnswerId}/questionanswer/${questionAnswerId}`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags QuestionnaireAnswer
     * @name UpdateQuestionAnswer
     * @summary Update QuestionAnswer.
     * @request PUT:/questionnaireanswer/{questionnaireAnswerId}/questionanswer/{questionAnswerId}
     * @secure
     */
    updateQuestionAnswer: (
      questionnaireAnswerId: string,
      questionAnswerId: string,
      data: QuestionAnswerDto,
      params: RequestParams = {},
    ) =>
      this.request<QuestionAnswerDto, ProblemDetails>({
        path: `/questionnaireanswer/${questionnaireAnswerId}/questionanswer/${questionAnswerId}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags QuestionnaireAnswer
     * @name DeleteQuestionAnswer
     * @summary Delete QuestionAnswer.
     * @request DELETE:/questionnaireanswer/{questionnaireAnswerId}/questionanswer/{questionAnswerId}
     * @secure
     */
    deleteQuestionAnswer: (
      questionnaireAnswerId: string,
      questionAnswerId: string,
      params: RequestParams = {},
    ) =>
      this.request<ActionResult, ProblemDetails>({
        path: `/questionnaireanswer/${questionnaireAnswerId}/questionanswer/${questionAnswerId}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags QuestionnaireAnswer
     * @name AddNewQuestionAnswer
     * @summary Insert new QuestionAnswer.
     * @request POST:/questionnaireanswer/{questionnaireAnswerId}/questionanswer
     * @secure
     */
    addNewQuestionAnswer: (
      questionnaireAnswerId: string,
      data: QuestionAnswerDto,
      params: RequestParams = {},
    ) =>
      this.request<QuestionAnswerDto, QuestionAnswerDto | ProblemDetails>({
        path: `/questionnaireanswer/${questionnaireAnswerId}/questionanswer`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags QuestionnaireAnswer
     * @name FilterQuestionnaireAnswer
     * @summary Filter QuestionAnswers by filter parameters.
     * @request POST:/questionnaireanswer/{questionnaireAnswerId}/questionanswer/filter
     * @secure
     */
    filterQuestionnaireAnswer: (
      questionnaireAnswerId: string,
      data: QuestionFilterRequest,
      params: RequestParams = {},
    ) =>
      this.request<QuestionAnswerDto[], QuestionAnswerDto[] | ProblemDetails>({
        path: `/questionnaireanswer/${questionnaireAnswerId}/questionanswer/filter`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags QuestionnaireAnswer
     * @name GetAllNotes
     * @request GET:/questionnaireanswer/{questionnaireAnswerId}/final-review-notes/all
     * @secure
     */
    getAllNotes: (questionnaireAnswerId: string, params: RequestParams = {}) =>
      this.request<Record<string, string[]>, ProblemDetails>({
        path: `/questionnaireanswer/${questionnaireAnswerId}/final-review-notes/all`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags QuestionnaireAnswer
     * @name GetAllCompletedQuestions
     * @request GET:/questionnaireanswer/{questionnaireAnswerId}/completed-questions/all
     * @secure
     */
    getAllCompletedQuestions: (
      questionnaireAnswerId: string,
      query?: {
        /** @default false */
        isAuditorSection?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<QuestionAnswerDto[], ProblemDetails>({
        path: `/questionnaireanswer/${questionnaireAnswerId}/completed-questions/all`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags QuestionnaireAnswer
     * @name GetAllUnansweredQuestions
     * @request GET:/questionnaireanswer/{questionnaireAnswerId}/unanswered-questions/all
     * @secure
     */
    getAllUnansweredQuestions: (
      questionnaireAnswerId: string,
      query?: {
        /** @default false */
        isAuditorSection?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<QuestionAnswerDto[], ProblemDetails>({
        path: `/questionnaireanswer/${questionnaireAnswerId}/unanswered-questions/all`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags QuestionnaireAnswer
     * @name GetNumberOfQuestionsWithComments
     * @request GET:/questionnaireanswer/{questionnaireAnswerId}/number-questions-with-comments
     * @secure
     */
    getNumberOfQuestionsWithComments: (
      questionnaireAnswerId: string,
      query?: {
        category?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<number, ProblemDetails>({
        path: `/questionnaireanswer/${questionnaireAnswerId}/number-questions-with-comments`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags QuestionnaireAnswer
     * @name GetNumberOfAttachments
     * @request GET:/questionnaireanswer/{questionnaireAnswerId}/number-of-attachments
     * @secure
     */
    getNumberOfAttachments: (
      questionnaireAnswerId: string,
      query?: {
        category?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<number, ProblemDetails>({
        path: `/questionnaireanswer/${questionnaireAnswerId}/number-of-attachments`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags QuestionnaireAnswer
     * @name SubmitToRscTrackResponse
     * @request GET:/questionnaireanswer/{questionnaireAnswerId}/submit-to-rsc
     * @secure
     */
    submitToRscTrackResponse: (
      questionnaireAnswerId: string,
      params: RequestParams = {},
    ) =>
      this.request<boolean, ProblemDetails>({
        path: `/questionnaireanswer/${questionnaireAnswerId}/submit-to-rsc`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags QuestionnaireAnswer
     * @name GetCoverLetterHeaderAndFooter
     * @request GET:/questionnaireanswer/{questionnaireAnswerId}/cover-letter-to-track
     * @secure
     */
    getCoverLetterHeaderAndFooter: (
      questionnaireAnswerId: string,
      params: RequestParams = {},
    ) =>
      this.request<QuestionnaireAnswer, ProblemDetails>({
        path: `/questionnaireanswer/${questionnaireAnswerId}/cover-letter-to-track`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags QuestionnaireAnswer
     * @name GetAccreditationStatusDashboard
     * @request GET:/questionnaireanswer/{questionnaireAnswerId}/accreditation-status-dashboard
     * @secure
     */
    getAccreditationStatusDashboard: (
      questionnaireAnswerId: string,
      params: RequestParams = {},
    ) =>
      this.request<AccreditationStatusDashboardResponse, ProblemDetails>({
        path: `/questionnaireanswer/${questionnaireAnswerId}/accreditation-status-dashboard`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags QuestionnaireAnswer
     * @name UpdateAccreditationStatusDashboard
     * @request PUT:/questionnaireanswer/{questionnaireAnswerId}/accreditation-status-dashboard
     * @secure
     */
    updateAccreditationStatusDashboard: (
      questionnaireAnswerId: string,
      data: AccreditationStatusDashboardRequest,
      params: RequestParams = {},
    ) =>
      this.request<IActionResult, ProblemDetails>({
        path: `/questionnaireanswer/${questionnaireAnswerId}/accreditation-status-dashboard`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags QuestionnaireAnswer
     * @name DeleteAccreditationStatusDashboard
     * @request DELETE:/questionnaireanswer/{questionnaireAnswerId}/accreditation-status-dashboard
     * @secure
     */
    deleteAccreditationStatusDashboard: (
      questionnaireAnswerId: string,
      params: RequestParams = {},
    ) =>
      this.request<IActionResult, ProblemDetails>({
        path: `/questionnaireanswer/${questionnaireAnswerId}/accreditation-status-dashboard`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags QuestionnaireAnswer
     * @name GetAllAccreditationStatusDashboard
     * @request GET:/questionnaireanswer/accreditation-status-dashboard/all
     * @secure
     */
    getAllAccreditationStatusDashboard: (
      query?: {
        /** @format int32 */
        year?: number;
        sortBy?: string;
        /** @format int32 */
        sortDirection?: number;
        isAscSort?: boolean;
        /** @format int32 */
        page?: number;
        /** @format int32 */
        pageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<AccreditationStatusDashboardResponse[], ProblemDetails>({
        path: `/questionnaireanswer/accreditation-status-dashboard/all`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags QuestionnaireAnswer
     * @name CreateAccreditationStatusDashboard
     * @request POST:/questionnaireanswer/accreditation-status-dashboard
     * @secure
     */
    createAccreditationStatusDashboard: (
      data: AccreditationStatusDashboardRequest,
      params: RequestParams = {},
    ) =>
      this.request<IActionResult, IActionResult | ProblemDetails>({
        path: `/questionnaireanswer/accreditation-status-dashboard`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  raceentry = {
    /**
     * No description
     *
     * @tags RaceEntry
     * @name GetAllAsync
     * @request GET:/raceentry/search
     * @secure
     */
    getAllAsync: (
      query?: {
        horseIds?: string[];
        searchText?: string;
        locationId?: string;
        raceNumber?: string;
        /** @format date-time */
        startDate?: string;
        /** @format date-time */
        endDate?: string;
        sortBy?: string;
        /** @format int32 */
        sortDirection?: number;
        isAscSort?: boolean;
        /** @format int32 */
        page?: number;
        /** @format int32 */
        pageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<RaceEntryResponse[], ProblemDetails>({
        path: `/raceentry/search`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags RaceEntry
     * @name GetByDateAsync
     * @request GET:/raceentry/by-date/{date}
     * @secure
     */
    getByDateAsync: (
      date: string,
      query?: {
        sortBy?: string;
        /** @format int32 */
        sortDirection?: number;
        isAscSort?: boolean;
        /** @format int32 */
        page?: number;
        /** @format int32 */
        pageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<RaceEntryResponse[], ProblemDetails>({
        path: `/raceentry/by-date/${date}`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags RaceEntry
     * @name GetRecentDatesAsync
     * @request GET:/raceentry/track/{locationId}/recent-dates
     * @secure
     */
    getRecentDatesAsync: (
      locationId: string,
      query?: {
        /**
         * @format int32
         * @default 5
         */
        numberOfEntries?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<RaceEntriesDatesResponse[], ProblemDetails>({
        path: `/raceentry/track/${locationId}/recent-dates`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags RaceEntry
     * @name GetRecentDatesAsync2
     * @request GET:/raceentry/track/{locationId}/{date}/{race}
     * @originalName getRecentDatesAsync
     * @duplicate
     * @secure
     */
    getRecentDatesAsync2: (
      locationId: string,
      date: string,
      race: string,
      query?: {
        sortBy?: string;
        /** @format int32 */
        sortDirection?: number;
        isAscSort?: boolean;
        /** @format int32 */
        page?: number;
        /** @format int32 */
        pageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<RaceEntryResponse[], ProblemDetails>({
        path: `/raceentry/track/${locationId}/${date}/${race}`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags RaceEntry
     * @name GetRecentDatesAsync3
     * @request GET:/raceentry/track/{locationId}/{date}
     * @originalName getRecentDatesAsync
     * @duplicate
     * @secure
     */
    getRecentDatesAsync3: (
      locationId: string,
      date: string,
      query?: {
        races?: string[];
        sortBy?: string;
        /** @format int32 */
        sortDirection?: number;
        isAscSort?: boolean;
        /** @format int32 */
        page?: number;
        /** @format int32 */
        pageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<RaceEntryResponse[], ProblemDetails>({
        path: `/raceentry/track/${locationId}/${date}`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags RaceEntry
     * @name GetPersonAsync
     * @request GET:/raceentry/person/{personId}
     * @secure
     */
    getPersonAsync: (
      personId: string,
      query?: {
        /** @format date-time */
        startDate?: string;
        /** @format date-time */
        endDate?: string;
        sortBy?: string;
        /** @format int32 */
        sortDirection?: number;
        isAscSort?: boolean;
        /** @format int32 */
        page?: number;
        /** @format int32 */
        pageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<RaceEntryResponse[], ProblemDetails>({
        path: `/raceentry/person/${personId}`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),
  };
  raceresult = {
    /**
     * No description
     *
     * @tags RaceResult
     * @name GetAllAsync
     * @request GET:/raceresult/search
     * @secure
     */
    getAllAsync: (
      query?: {
        horseIds?: string[];
        searchText?: string;
        locationId?: string;
        raceNumber?: string;
        /** @format date-time */
        startDate?: string;
        /** @format date-time */
        endDate?: string;
        sortBy?: string;
        /** @format int32 */
        sortDirection?: number;
        isAscSort?: boolean;
        /** @format int32 */
        page?: number;
        /** @format int32 */
        pageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<RaceResultResponse[], ProblemDetails>({
        path: `/raceresult/search`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags RaceResult
     * @name GetByDateAsync
     * @request GET:/raceresult/by-date/{date}
     * @secure
     */
    getByDateAsync: (
      date: string,
      query?: {
        sortBy?: string;
        /** @format int32 */
        sortDirection?: number;
        isAscSort?: boolean;
        /** @format int32 */
        page?: number;
        /** @format int32 */
        pageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<RaceResultResponse[], ProblemDetails>({
        path: `/raceresult/by-date/${date}`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags RaceResult
     * @name GetRecentDatesAsync
     * @request GET:/raceresult/track/{locationId}/{date}
     * @secure
     */
    getRecentDatesAsync: (
      locationId: string,
      date: string,
      query?: {
        races?: string[];
        sortBy?: string;
        /** @format int32 */
        sortDirection?: number;
        isAscSort?: boolean;
        /** @format int32 */
        page?: number;
        /** @format int32 */
        pageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<RaceResultResponse[], ProblemDetails>({
        path: `/raceresult/track/${locationId}/${date}`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags RaceResult
     * @name GetHorsesLastRace
     * @request GET:/raceresult/horses/{horseId}/last
     * @secure
     */
    getHorsesLastRace: (
      horseId: string,
      query?: {
        /** @default false */
        includeScratched?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<RaceResultResponse, ProblemDetails>({
        path: `/raceresult/horses/${horseId}/last`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags RaceResult
     * @name AddAsync
     * @summary Create race result
     * @request POST:/raceresult
     * @secure
     */
    addAsync: (data: RaceResultCreateRequest, params: RequestParams = {}) =>
      this.request<RaceResultResponse, RaceResultResponse | ProblemDetails>({
        path: `/raceresult`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags RaceResult
     * @name DeleteAsync
     * @request DELETE:/raceresult/{raceResultId}
     * @secure
     */
    deleteAsync: (raceResultId: string, params: RequestParams = {}) =>
      this.request<IActionResult, ProblemDetails>({
        path: `/raceresult/${raceResultId}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  ruling = {
    /**
     * No description
     *
     * @tags Ruling
     * @name GetById
     * @summary Retrieves a ruling by its ID.
     * @request GET:/ruling/{rulingId}
     * @secure
     */
    getById: (rulingId: string, params: RequestParams = {}) =>
      this.request<RulingResponse, ProblemDetails>({
        path: `/ruling/${rulingId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Ruling
     * @name Update
     * @summary Updates an existing ruling.
     * @request PUT:/ruling/{rulingId}
     * @secure
     */
    update: (
      rulingId: string,
      data: RulingRequest,
      params: RequestParams = {},
    ) =>
      this.request<RulingResponse, string | ProblemDetails>({
        path: `/ruling/${rulingId}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Ruling
     * @name BatchGet
     * @summary Retrieves multiple rulings by their IDs.
     * @request PUT:/ruling/batch-get
     * @secure
     */
    batchGet: (data: string[], params: RequestParams = {}) =>
      this.request<RulingResponse[], string | ProblemDetails>({
        path: `/ruling/batch-get`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Ruling
     * @name BatchUpdate
     * @summary Updates multiple rulings in a batch.
     * @request PUT:/ruling/batch-update
     * @secure
     */
    batchUpdate: (data: RulingBatchUpdate[], params: RequestParams = {}) =>
      this.request<ActionResult, string | ProblemDetails>({
        path: `/ruling/batch-update`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Ruling
     * @name GetByActionCode
     * @summary Retrieves a ruling by its action code.
     * @request GET:/ruling/by-action-code/{actionCode}
     * @secure
     */
    getByActionCode: (actionCode: string, params: RequestParams = {}) =>
      this.request<RulingResponse, ProblemDetails>({
        path: `/ruling/by-action-code/${actionCode}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Ruling
     * @name GetByPersonId
     * @summary Retrieves rulings for a specific person.
     * @request GET:/ruling/person/{hisaPersonId}
     * @secure
     */
    getByPersonId: (
      hisaPersonId: string,
      query?: {
        text?: string;
        /** @format date */
        date?: string;
        locationId?: string;
        sortBy?: string;
        /** @format int32 */
        sortDirection?: number;
        isAscSort?: boolean;
        /** @format int32 */
        page?: number;
        /** @format int32 */
        pageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<RulingResponse[], string | ProblemDetails>({
        path: `/ruling/person/${hisaPersonId}`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Ruling
     * @name GetByHorseId
     * @summary Retrieves rulings for a specific horse.
     * @request GET:/ruling/horse/{hisaHorseId}
     * @secure
     */
    getByHorseId: (
      hisaHorseId: string,
      query?: {
        text?: string;
        /** @format date */
        date?: string;
        locationId?: string;
        sortBy?: string;
        /** @format int32 */
        sortDirection?: number;
        isAscSort?: boolean;
        /** @format int32 */
        page?: number;
        /** @format int32 */
        pageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<RulingResponse[], string | ProblemDetails>({
        path: `/ruling/horse/${hisaHorseId}`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Ruling
     * @name GetEnforcedByPersonId
     * @summary Retrieves enforced rulings for a specific person.
     * @request GET:/ruling/person/{hisaPersonId}/enforced
     * @secure
     */
    getEnforcedByPersonId: (
      hisaPersonId: string,
      query?: {
        sortBy?: string;
        /** @format int32 */
        sortDirection?: number;
        isAscSort?: boolean;
        /** @format int32 */
        page?: number;
        /** @format int32 */
        pageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<RulingResponse[], string | ProblemDetails>({
        path: `/ruling/person/${hisaPersonId}/enforced`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Ruling
     * @name GetVisibleByPersonId
     * @summary Retrieves rulings visible to a specific person.
     * @request GET:/ruling/person/{hisaPersonId}/visibletoperson
     * @secure
     */
    getVisibleByPersonId: (
      hisaPersonId: string,
      query?: {
        /** Search text to filter results. */
        searchText?: string;
        sortBy?: string;
        /** @format int32 */
        sortDirection?: number;
        isAscSort?: boolean;
        /** @format int32 */
        page?: number;
        /** @format int32 */
        pageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<RulingResponse[], string | ProblemDetails>({
        path: `/ruling/person/${hisaPersonId}/visibletoperson`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Ruling
     * @name GetByPersonIdAndSuspensionDays
     * @summary Retrieves rulings for a person based on suspension days.
     * @request POST:/ruling/person/{hisaPersonId}/suspension-days
     * @secure
     */
    getByPersonIdAndSuspensionDays: (
      hisaPersonId: string,
      data: string[],
      params: RequestParams = {},
    ) =>
      this.request<RulingResponse[], RulingResponse[] | ProblemDetails>({
        path: `/ruling/person/${hisaPersonId}/suspension-days`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Ruling
     * @name GetByHorseIdAndSuspensionDays
     * @summary Retrieves rulings for a horse based on suspension days.
     * @request POST:/ruling/horse/{hisaHorseId}/horse-suspension-days
     * @secure
     */
    getByHorseIdAndSuspensionDays: (
      hisaHorseId: string,
      data: string[],
      params: RequestParams = {},
    ) =>
      this.request<RulingResponse[], RulingResponse[] | ProblemDetails>({
        path: `/ruling/horse/${hisaHorseId}/horse-suspension-days`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Ruling
     * @name StartPaymentReminder
     * @summary Starts a payment reminder process.
     * @request GET:/ruling/start-payment-reminder
     * @secure
     */
    startPaymentReminder: (params: RequestParams = {}) =>
      this.request<boolean, string | ProblemDetails>({
        path: `/ruling/start-payment-reminder`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Ruling
     * @name GetByDate
     * @summary Retrieves rulings up to a specified date.
     * @request GET:/ruling/unpaid/{date}
     * @secure
     */
    getByDate: (
      date: string,
      query?: {
        sortBy?: string;
        /** @format int32 */
        sortDirection?: number;
        isAscSort?: boolean;
        /** @format int32 */
        page?: number;
        /** @format int32 */
        pageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<RulingResponse[], string | ProblemDetails>({
        path: `/ruling/unpaid/${date}`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Ruling
     * @name GetPointsByPersonId
     * @summary Retrieves the points for a specific person.
     * @request GET:/ruling/person/{hisaPersonId}/points
     * @secure
     */
    getPointsByPersonId: (hisaPersonId: string, params: RequestParams = {}) =>
      this.request<RulingPersonPoints, string | ProblemDetails>({
        path: `/ruling/person/${hisaPersonId}/points`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Ruling
     * @name GetFinesByPersonId
     * @summary Retrieves the fines for a specific person.
     * @request GET:/ruling/person/{hisaPersonId}/fines
     * @secure
     */
    getFinesByPersonId: (hisaPersonId: string, params: RequestParams = {}) =>
      this.request<RulingPersonFine, string | ProblemDetails>({
        path: `/ruling/person/${hisaPersonId}/fines`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Ruling
     * @name GetAll
     * @summary Retrieves all rulings.
     * @request GET:/ruling/all
     * @secure
     */
    getAll: (
      query?: {
        search?: string;
        includeDeleted?: boolean;
        sortBy?: string;
        /** @format int32 */
        sortDirection?: number;
        isAscSort?: boolean;
        /** @format int32 */
        page?: number;
        /** @format int32 */
        pageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<RulingResponse[], ProblemDetails>({
        path: `/ruling/all`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Ruling
     * @name GetAllVisibleToPerson
     * @summary Retrieves only those rulings that have a status that allows them to be shown to the person.
     * @request GET:/ruling/all/visibletoperson
     * @secure
     */
    getAllVisibleToPerson: (
      query?: {
        search?: string;
        includeDeleted?: boolean;
        sortBy?: string;
        /** @format int32 */
        sortDirection?: number;
        isAscSort?: boolean;
        /** @format int32 */
        page?: number;
        /** @format int32 */
        pageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<RulingResponse[], ProblemDetails>({
        path: `/ruling/all/visibletoperson`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Ruling
     * @name Create
     * @summary Adds a new ruling.
     * @request POST:/ruling
     * @secure
     */
    create: (data: RulingRequest, params: RequestParams = {}) =>
      this.request<RulingResponse, RulingResponse | ProblemDetails>({
        path: `/ruling`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Ruling
     * @name Delete
     * @summary Deletes a ruling.
     * @request DELETE:/ruling/{rulingId}/delete
     * @secure
     */
    delete: (rulingId: string, params: RequestParams = {}) =>
      this.request<string[], ProblemDetails>({
        path: `/ruling/${rulingId}/delete`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Ruling
     * @name AddDocument
     * @summary Adds a document to the specified ruling.
     * @request POST:/ruling/{rulingId}/document/add
     * @secure
     */
    addDocument: (
      rulingId: string,
      data: {
        /** The name of the file to be added. */
        fileName: string;
        /** The list of tags associated with the document. */
        tags?: string[];
      },
      params: RequestParams = {},
    ) =>
      this.request<PresignedPost, PresignedPost | ProblemDetails>({
        path: `/ruling/${rulingId}/document/add`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Ruling
     * @name GetDuplicatesByCondition
     * @summary Retrieves duplicate rulings based on the specified search conditions.
     * @request POST:/ruling/get-duplicates-by-condition
     * @secure
     */
    getDuplicatesByCondition: (
      data: PersonsInvolvedSearchDuplicates,
      params: RequestParams = {},
    ) =>
      this.request<RulingResponse[], RulingResponse[] | ProblemDetails>({
        path: `/ruling/get-duplicates-by-condition`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Ruling
     * @name GetAllDocuments
     * @summary Retrieves all documents for a specific ruling.
     * @request GET:/ruling/{rulingId}/document/all
     * @secure
     */
    getAllDocuments: (
      rulingId: string,
      query?: {
        /** Optional tags to filter documents. */
        tags?: string[];
      },
      params: RequestParams = {},
    ) =>
      this.request<DocumentFileResponse[], ProblemDetails>({
        path: `/ruling/${rulingId}/document/all`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Ruling
     * @name MergePersonsRulingsAndPayments
     * @summary Merges rulings and payments for two persons.
     * @request GET:/ruling/merge/persons/{oldPersonId}/{newPersonId}
     * @secure
     */
    mergePersonsRulingsAndPayments: (
      oldPersonId: string,
      newPersonId: string,
      params: RequestParams = {},
    ) =>
      this.request<ActionResult, string | ProblemDetails>({
        path: `/ruling/merge/persons/${oldPersonId}/${newPersonId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Ruling
     * @name GetPersonsRulings
     * @summary Retrieves rulings associated with persons based on a search query.
     * @request GET:/ruling/personsrulings
     * @secure
     */
    getPersonsRulings: (
      query?: {
        searchText?: string;
        /** @format date-time */
        startDate?: string;
        /** @format date-time */
        endDate?: string;
        sortBy?: string;
        /** @format int32 */
        sortDirection?: number;
        isAscSort?: boolean;
        /** @format int32 */
        page?: number;
        /** @format int32 */
        pageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<PersonRuling[], string | ProblemDetails>({
        path: `/ruling/personsrulings`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),
  };
  scratch = {
    /**
     * No description
     *
     * @tags Scratch
     * @name GetById
     * @summary Retrieves a single scratch by its identifier.
     * @request GET:/scratch/{scratchId}
     * @secure
     */
    getById: (scratchId: string, params: RequestParams = {}) =>
      this.request<ScratchResponse, ProblemDetails>({
        path: `/scratch/${scratchId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Scratch
     * @name Patch
     * @summary Updates specific fields of an existing scratch record.
     * @request PATCH:/scratch/{scratchId}
     * @secure
     */
    patch: (
      scratchId: string,
      data: ScratchUpdateRequest,
      params: RequestParams = {},
    ) =>
      this.request<ScratchResponse, ProblemDetails>({
        path: `/scratch/${scratchId}`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Scratch
     * @name Delete
     * @summary Marks a scratch record as deleted. This endpoint allows authorized users to delete an incorrect or erroneously created scratch record.
     * @request DELETE:/scratch/{scratchId}
     * @secure
     */
    delete: (scratchId: string, params: RequestParams = {}) =>
      this.request<ActionResult, ProblemDetails>({
        path: `/scratch/${scratchId}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Scratch
     * @name GetScratchReasons
     * @summary Retrieves the list of valid scratch reasons organized by caller type.
     * @request GET:/scratch/scratch-reasons
     * @secure
     */
    getScratchReasons: (params: RequestParams = {}) =>
      this.request<ScratchReasonsResponse[], ProblemDetails>({
        path: `/scratch/scratch-reasons`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Scratch
     * @name Search
     * @summary Searches scratches using complex filter criteria.
     * @request GET:/scratch/search
     * @secure
     */
    search: (
      query?: {
        scratchIds?: string[] | null;
        locationIds?: string[] | null;
        horseIds?: string[] | null;
        hisaStewardIds?: string[] | null;
        hisaJockeyIds?: string[] | null;
        responsiblePersonIds?: string[] | null;
        raceNumbers?: number[] | null;
        statuses?: ScratchStatus[] | null;
        calledInBy?: CalledInType[] | null;
        scratchReasonCodes?: string[] | null;
        type?: ScratchType | null;
        /** @format date-time */
        raceStartDate?: string | null;
        /** @format date-time */
        raceEndDate?: string | null;
        /** @format date-time */
        postedAtStartDate?: string | null;
        /** @format date-time */
        postedAtEndDate?: string | null;
        includeDeleted?: boolean | null;
        searchText?: string | null;
        /** @format date-time */
        startDate?: string | null;
        /** @format date-time */
        endDate?: string | null;
        sortBy?: string | null;
        /** @format int32 */
        sortDirection?: number;
        isAscSort?: boolean;
        /** @format int32 */
        page?: number;
        /** @format int32 */
        pageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<ScratchResponse[], ProblemDetails>({
        path: `/scratch/search`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Scratch
     * @name Create
     * @summary Creates a new scratch.
     * @request POST:/scratch
     * @secure
     */
    create: (data: ScratchCreateRequest, params: RequestParams = {}) =>
      this.request<ScratchResponse, ScratchResponse | ProblemDetails>({
        path: `/scratch`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Scratch
     * @name AdminPatch
     * @summary Performs an administrative update on a scratch (e.g., status changes).
     * @request PATCH:/scratch/admin/{scratchId}
     * @secure
     */
    adminPatch: (
      scratchId: string,
      data: ScratchAdminUpdateRequest,
      params: RequestParams = {},
    ) =>
      this.request<ScratchResponse, ProblemDetails>({
        path: `/scratch/admin/${scratchId}`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Scratch
     * @name CancelScratchWithToken
     * @summary Cancels all scratch records for a specific race, date, and location.
     * @request POST:/scratch/cancel
     * @secure
     */
    cancelScratchWithToken: (
      data: ScratchCancelBaseRequest,
      params: RequestParams = {},
    ) =>
      this.request<ScratchResponse[], ScratchResponse[] | ProblemDetails>({
        path: `/scratch/cancel`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Scratch
     * @name GetCancelledScratches
     * @summary Get all scratch cancellation records by location and date.
     * @request GET:/scratch/cancel/{locationId}/{date}
     * @secure
     */
    getCancelledScratches: (
      locationId: string,
      date: string,
      params: RequestParams = {},
    ) =>
      this.request<CanceledScratchResponse[], ProblemDetails>({
        path: `/scratch/cancel/${locationId}/${date}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Scratch
     * @name CancelScratch
     * @summary Cancels all scratch records for a specific race, date, and location.
     * @request POST:/scratch/admin/cancel
     * @secure
     */
    cancelScratch: (data: ScratchCancelRequest, params: RequestParams = {}) =>
      this.request<ScratchResponse[], ScratchResponse[] | ProblemDetails>({
        path: `/scratch/admin/cancel`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Scratch
     * @name BulkPostScratchesWithToken
     * @summary Posts multiple scratch records in a single operation, transitioning them from unposted to posted status.
     * @request POST:/scratch/post
     * @secure
     */
    bulkPostScratchesWithToken: (
      data: ScratchBulkPostBaseRequest,
      params: RequestParams = {},
    ) =>
      this.request<
        ScratchBulkPostResponse,
        ScratchBulkPostResponse | ProblemDetails
      >({
        path: `/scratch/post`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Scratch
     * @name BulkPostScratches
     * @summary Posts multiple scratch records in a single operation, transitioning them from unposted to posted status.
     * @request POST:/scratch/admin/post
     * @secure
     */
    bulkPostScratches: (
      data: ScratchBulkPostRequest,
      params: RequestParams = {},
    ) =>
      this.request<
        ScratchBulkPostResponse,
        ScratchBulkPostResponse | ProblemDetails
      >({
        path: `/scratch/admin/post`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Scratch
     * @name GetDeadlineAsync
     * @summary Get ScratchDeadline.
     * @request GET:/scratch/deadlines/{locationId}/{date}
     * @secure
     */
    getDeadlineAsync: (
      locationId: string,
      date: string,
      params: RequestParams = {},
    ) =>
      this.request<ScratchDeadlineResponse, ProblemDetails>({
        path: `/scratch/deadlines/${locationId}/${date}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Scratch
     * @name UpsertAsync
     * @summary Add a new or update an existing ScratchDeadline.
     * @request PUT:/scratch/deadlines
     * @secure
     */
    upsertAsync: (
      data: ScratchDeadlineUpsertRequest,
      params: RequestParams = {},
    ) =>
      this.request<
        ScratchDeadlineResponse,
        ScratchDeadlineResponse | ProblemDetails
      >({
        path: `/scratch/deadlines`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  systemsettings = {
    /**
     * No description
     *
     * @tags SystemSettings
     * @name GetCensusSystemSettings
     * @request GET:/systemsettings/census
     * @secure
     */
    getCensusSystemSettings: (params: RequestParams = {}) =>
      this.request<SystemSetting[], ProblemDetails>({
        path: `/systemsettings/census`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  testhelper = {
    /**
     * No description
     *
     * @tags TestHelper
     * @name DeletePersonAsync
     * @summary FOR TESTING ONLY. Delete person by person id.
     * @request DELETE:/testhelper/delete-person-by-id/{personId}
     * @secure
     */
    deletePersonAsync: (personId: string, params: RequestParams = {}) =>
      this.request<string[], ProblemDetails>({
        path: `/testhelper/delete-person-by-id/${personId}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags TestHelper
     * @name DeletePersonByEmailAsync
     * @summary FOR TESTING ONLY. Delete person by person id.
     * @request DELETE:/testhelper/delete-person-by-cognito-id/{userName}
     * @secure
     */
    deletePersonByEmailAsync: (userName: string, params: RequestParams = {}) =>
      this.request<string[], ProblemDetails>({
        path: `/testhelper/delete-person-by-cognito-id/${userName}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags TestHelper
     * @name CreatePersonCognitoAsync
     * @summary FOR TESTING ONLY. Delete person by person id.
     * @request POST:/testhelper/create-person-cognito-id/{personId}/{password}
     * @secure
     */
    createPersonCognitoAsync: (
      personId: string,
      password: string,
      params: RequestParams = {},
    ) =>
      this.request<string[], string[] | ProblemDetails>({
        path: `/testhelper/create-person-cognito-id/${personId}/${password}`,
        method: "POST",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags TestHelper
     * @name DeleteHorseAsync
     * @summary FOR TESTING ONLY.
     * @request DELETE:/testhelper/delete-horse-by-id/{horseId}
     * @secure
     */
    deleteHorseAsync: (horseId: string, params: RequestParams = {}) =>
      this.request<string[], ProblemDetails>({
        path: `/testhelper/delete-horse-by-id/${horseId}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
 * No description
 *
 * @tags TestHelper
 * @name DeleteQuestionAnswersByQuestionnaireAnswerId
 * @summary For testing only!
Delete all QuestionAnswers and QuestionnaireAnswer by QuestionnaireAnswerId which relate to a certain QuestionnaireAnswer.
 * @request DELETE:/testhelper/{questionnaireId}/questionanswers/{locationId}
 * @secure
 */
    deleteQuestionAnswersByQuestionnaireAnswerId: (
      questionnaireId: string,
      locationId: string,
      params: RequestParams = {},
    ) =>
      this.request<ActionResult, ProblemDetails>({
        path: `/testhelper/${questionnaireId}/questionanswers/${locationId}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags TestHelper
     * @name GetQuestionnaireAnswerByQuestionnaireAnswerId
     * @request GET:/testhelper/{questionnaireId}/questionanswers/{locationId}
     * @secure
     */
    getQuestionnaireAnswerByQuestionnaireAnswerId: (
      questionnaireId: string,
      locationId: string,
      params: RequestParams = {},
    ) =>
      this.request<string, ProblemDetails>({
        path: `/testhelper/${questionnaireId}/questionanswers/${locationId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags TestHelper
     * @name FixUsaAddress
     * @summary FOR Fix Address ONLY.
     * @request GET:/testhelper/fix-usa-address
     * @secure
     */
    fixUsaAddress: (params: RequestParams = {}) =>
      this.request<string[], ProblemDetails>({
        path: `/testhelper/fix-usa-address`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags TestHelper
     * @name SetBarredFromRacing
     * @summary FOR TESTING ONLY. Set person BarredFromRacing.
     * @request PUT:/testhelper/{personId}/barr-from-racing
     * @secure
     */
    setBarredFromRacing: (
      personId: string,
      query?: {
        value?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<PersonResponse, ProblemDetails>({
        path: `/testhelper/${personId}/barr-from-racing`,
        method: "PUT",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags TestHelper
     * @name CreateRaceEntry
     * @summary FOR TESTING ONLY. Create RaceEntry.
     * @request POST:/testhelper/raceentry/create
     * @secure
     */
    createRaceEntry: (data: RaceEntry, params: RequestParams = {}) =>
      this.request<RaceEntry[], RaceEntry[] | ProblemDetails>({
        path: `/testhelper/raceentry/create`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags TestHelper
     * @name DeleteRaceEntry
     * @summary FOR TESTING ONLY. Delete RaceEntry.
     * @request DELETE:/testhelper/raceentry/delete
     * @secure
     */
    deleteRaceEntry: (data: string[], params: RequestParams = {}) =>
      this.request<ActionResult, ProblemDetails>({
        path: `/testhelper/raceentry/delete`,
        method: "DELETE",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags TestHelper
     * @name GenerateTokensAsync
     * @summary FOR TESTING ONLY. Generate bearer access token.
     * @request POST:/testhelper/generate-token
     * @secure
     */
    generateTokensAsync: (data: AuthLoginRequest, params: RequestParams = {}) =>
      this.request<AuthLoginResponse, AuthLoginResponse | ProblemDetails>({
        path: `/testhelper/generate-token`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags TestHelper
     * @name CreateHorsesForFirstWaiver
     * @summary FOR TESTING ONLY. Create waiver.
     * @request POST:/testhelper/waiver-1
     * @secure
     */
    createHorsesForFirstWaiver: (
      data: WaiverRequestDto,
      params: RequestParams = {},
    ) =>
      this.request<ActionResult, ActionResult | ProblemDetails>({
        path: `/testhelper/waiver-1`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags TestHelper
     * @name GetEnumValues
     * @request GET:/testhelper/enums
     * @secure
     */
    getEnumValues: (params: RequestParams = {}) =>
      this.request<EnumResponse[], ProblemDetails>({
        path: `/testhelper/enums`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags TestHelper
     * @name DeleteTestPostLayoffReport
     * @request DELETE:/testhelper/post-layoff-report/{reportId}
     * @secure
     */
    deleteTestPostLayoffReport: (
      reportId: string,
      params: RequestParams = {},
    ) =>
      this.request<ActionResult, ProblemDetails>({
        path: `/testhelper/post-layoff-report/${reportId}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags TestHelper
     * @name RunVetListEnforcement
     * @request POST:/testhelper/vetslist-recency-enforcement
     * @secure
     */
    runVetListEnforcement: (data: string[], params: RequestParams = {}) =>
      this.request<ActionResult, ActionResult | ProblemDetails>({
        path: `/testhelper/vetslist-recency-enforcement`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags TestHelper
     * @name NotifyRulingPaymentDue
     * @request POST:/testhelper/ruling/payment-due-notify
     * @secure
     */
    notifyRulingPaymentDue: (
      data: RulingPaymentDueRequest,
      params: RequestParams = {},
    ) =>
      this.request<ActionResult, ActionResult | ProblemDetails>({
        path: `/testhelper/ruling/payment-due-notify`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags TestHelper
     * @name GetPeopleMailGroups
     * @summary FOR TESTING ONLY. Get Odoo request body for persons
     * @request POST:/testhelper/person/mail-groups
     * @secure
     */
    getPeopleMailGroups: (data: string[], params: RequestParams = {}) =>
      this.request<PersonOdooRequest[], PersonOdooRequest[] | ProblemDetails>({
        path: `/testhelper/person/mail-groups`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  tjcproxy = {
    /**
     * No description
     *
     * @tags TjcProxy
     * @name GetHorseById
     * @summary Find Tjc Horse by Id
     * @request GET:/tjcproxy/horse/{horseId}
     * @secure
     */
    getHorseById: (horseId: string, params: RequestParams = {}) =>
      this.request<TjcTjcHorse[], ProblemDetails>({
        path: `/tjcproxy/horse/${horseId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags TjcProxy
     * @name GetHorseActivities
     * @summary Find horse activities from Tjc
     * @request GET:/tjcproxy/horse/{horseId}/activities
     * @secure
     */
    getHorseActivities: (horseId: string, params: RequestParams = {}) =>
      this.request<TjcTjcHorseActivities, ProblemDetails>({
        path: `/tjcproxy/horse/${horseId}/activities`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags TjcProxy
     * @name GetPersonById
     * @summary Find person from Tjc by Id
     * @request GET:/tjcproxy/person/{personId}
     * @secure
     */
    getPersonById: (personId: string, params: RequestParams = {}) =>
      this.request<TjcTjcPerson[], ProblemDetails>({
        path: `/tjcproxy/person/${personId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  tjcsearch = {
    /**
     * No description
     *
     * @tags TjcSearch
     * @name PersonMatch
     * @summary Makes sure a person is not registered with HISA, and looks them up in TJC.
     * @request POST:/tjcsearch/person-match
     * @secure
     */
    personMatch: (data: PersonMatchRequest, params: RequestParams = {}) =>
      this.request<
        PersonMatchResponse[],
        PersonMatchResponse[] | ProblemDetails
      >({
        path: `/tjcsearch/person-match`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags TjcSearch
     * @name HorseMatch
     * @summary Make sure a horse is not registered with HISA, and looks it up in TJC.
     * @request POST:/tjcsearch/horse-match
     * @secure
     */
    horseMatch: (data: HorseMatchRequest, params: RequestParams = {}) =>
      this.request<HorseMatchResponse[], HorseMatchResponse[] | ProblemDetails>(
        {
          path: `/tjcsearch/horse-match`,
          method: "POST",
          body: data,
          secure: true,
          type: ContentType.Json,
          format: "json",
          ...params,
        },
      ),

    /**
     * No description
     *
     * @tags TjcSearch
     * @name HorseMatchAll
     * @summary Find horses, registered with HISA and looks it up in TJC.
     * @request POST:/tjcsearch/horse-match/all
     * @secure
     */
    horseMatchAll: (data: HorseMatchRequest, params: RequestParams = {}) =>
      this.request<
        CoveredHorseAndTjcResponse,
        CoveredHorseAndTjcResponse | ProblemDetails
      >({
        path: `/tjcsearch/horse-match/all`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags TjcSearch
     * @name HorseAutocomplete
     * @summary Predicts the name of a horse from the prefix.
     * @request GET:/tjcsearch/horse-autocomplete/{search}
     * @secure
     */
    horseAutocomplete: (search: string, params: RequestParams = {}) =>
      this.request<string[], ProblemDetails>({
        path: `/tjcsearch/horse-autocomplete/${search}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags TjcSearch
     * @name TrainersFromOwnersAsync
     * @summary Look up trainers related to owner.
     * @request POST:/tjcsearch/related-people/trainers-from-owner
     * @secure
     */
    trainersFromOwnersAsync: (
      data: PersonFromOwnerRequest,
      params: RequestParams = {},
    ) =>
      this.request<string[], string[] | ProblemDetails>({
        path: `/tjcsearch/related-people/trainers-from-owner`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags TjcSearch
     * @name HorsesFromTrainerAsync
     * @summary Look up horses related to trainer.
     * @request POST:/tjcsearch/related-people/horses-from-trainer
     * @secure
     */
    horsesFromTrainerAsync: (
      data: PersonFromOwnerRequest,
      params: RequestParams = {},
    ) =>
      this.request<string[], string[] | ProblemDetails>({
        path: `/tjcsearch/related-people/horses-from-trainer`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags TjcSearch
     * @name HorseHealth
     * @summary Return the health information for a specific horse.
     * @request GET:/tjcsearch/horse/{referenceNumber}/{registry}/health
     * @secure
     */
    horseHealth: (
      referenceNumber: number,
      registry: string,
      params: RequestParams = {},
    ) =>
      this.request<Record<string, string>, ProblemDetails>({
        path: `/tjcsearch/horse/${referenceNumber}/${registry}/health`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  treatmentProtocols = {
    /**
     * No description
     *
     * @tags TreatmentProtocol
     * @name CreateTreatmentProtocol
     * @summary Creates a treatment protocol.
     * @request POST:/treatment-protocols
     * @secure
     */
    createTreatmentProtocol: (
      data: TreatmentProtocolCreateRequest,
      params: RequestParams = {},
    ) =>
      this.request<
        TreatmentProtocolResponse,
        TreatmentProtocolResponse | ProblemDetails
      >({
        path: `/treatment-protocols`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags TreatmentProtocol
     * @name CreateTreatmentTemplate
     * @summary Creates a treatment template.
     * @request POST:/treatment-protocols/{protocolId}/templates
     * @secure
     */
    createTreatmentTemplate: (
      protocolId: string,
      data: TreatmentTemplateCreateRequest,
      params: RequestParams = {},
    ) =>
      this.request<
        TreatmentTemplateResponse,
        TreatmentTemplateResponse | ProblemDetails
      >({
        path: `/treatment-protocols/${protocolId}/templates`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags TreatmentProtocol
     * @name UpdateTreatmentProtocol
     * @summary Updates a treatment protocol.
     * @request PUT:/treatment-protocols/{protocolId}/update
     * @secure
     */
    updateTreatmentProtocol: (
      protocolId: string,
      data: TreatmentProtocolUpdateRequest,
      params: RequestParams = {},
    ) =>
      this.request<TreatmentProtocolResponse, ProblemDetails>({
        path: `/treatment-protocols/${protocolId}/update`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags TreatmentProtocol
     * @name UpdateTreatmentProtocolVisibility
     * @summary Updates visibility a treatment protocol.
     * @request PUT:/treatment-protocols/{protocolId}/visibility
     * @secure
     */
    updateTreatmentProtocolVisibility: (
      protocolId: string,
      data: TreatmentProtocolVisibilityRequest,
      params: RequestParams = {},
    ) =>
      this.request<TreatmentProtocolResponse, ProblemDetails>({
        path: `/treatment-protocols/${protocolId}/visibility`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags TreatmentProtocol
     * @name UpdateTreatmentTemplate
     * @summary Updates a treatment template.
     * @request PUT:/treatment-protocols/{protocolId}/templates/{templateId}
     * @secure
     */
    updateTreatmentTemplate: (
      protocolId: string,
      templateId: string,
      data: TreatmentTemplateUpdateRequest,
      params: RequestParams = {},
    ) =>
      this.request<TreatmentTemplateResponse, ProblemDetails>({
        path: `/treatment-protocols/${protocolId}/templates/${templateId}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags TreatmentProtocol
     * @name DeleteTreatmentTemplate
     * @summary Deletes a treatment template.
     * @request DELETE:/treatment-protocols/{protocolId}/templates/{templateId}
     * @secure
     */
    deleteTreatmentTemplate: (
      protocolId: string,
      templateId: string,
      params: RequestParams = {},
    ) =>
      this.request<IActionResult, ProblemDetails>({
        path: `/treatment-protocols/${protocolId}/templates/${templateId}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags TreatmentProtocol
     * @name DeleteTreatmentProtocol
     * @summary Deletes a treatment protocol.
     * @request DELETE:/treatment-protocols/{protocolId}
     * @secure
     */
    deleteTreatmentProtocol: (protocolId: string, params: RequestParams = {}) =>
      this.request<IActionResult, ProblemDetails>({
        path: `/treatment-protocols/${protocolId}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  usersetting = {
    /**
     * No description
     *
     * @tags UserSetting
     * @name GetByKey
     * @summary Retrieves a user setting by app ID, person ID, and data key.
     * @request GET:/usersetting/{appId}/{userId}/{settingName}
     * @secure
     */
    getByKey: (
      appId: string,
      userId: string,
      settingName: string,
      params: RequestParams = {},
    ) =>
      this.request<UserSettingsResponse, ProblemDetails>({
        path: `/usersetting/${appId}/${userId}/${settingName}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags UserSetting
     * @name Upsert
     * @summary Add a new or update an existing user setting.
     * @request PUT:/usersetting/{appId}/{userId}/{settingName}
     * @secure
     */
    upsert: (
      appId: string,
      userId: string,
      settingName: string,
      data: string,
      params: RequestParams = {},
    ) =>
      this.request<ActionResult, void | ProblemDetails>({
        path: `/usersetting/${appId}/${userId}/${settingName}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags UserSetting
     * @name Delete
     * @summary Deletes a user setting.
     * @request DELETE:/usersetting/{appId}/{userId}/{settingName}
     * @secure
     */
    delete: (
      appId: string,
      userId: string,
      settingName: string,
      params: RequestParams = {},
    ) =>
      this.request<ActionResult, ProblemDetails>({
        path: `/usersetting/${appId}/${userId}/${settingName}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags UserSetting
     * @name GetAll
     * @summary Gets all settings for a specific user.
     * @request GET:/usersetting/{appId}/{userId}
     * @secure
     */
    getAll: (appId: string, userId: string, params: RequestParams = {}) =>
      this.request<UserSettingsResponse[], ProblemDetails>({
        path: `/usersetting/${appId}/${userId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  vetslist = {
    /**
     * @description <br/><br/>Permission validation attribute: AuthorizePropertyAttribute<br/><br/>Validation descriptions:<br/><br/>Required permissions: vets-list:internal-notes<br/><br/>Field under validation: VetsInternalNotes<br/><br/><br/><br/>
     *
     * @tags VetsList
     * @name BatchGet
     * @request PUT:/vetslist/batch-get
     * @secure
     */
    batchGet: (data: string[], params: RequestParams = {}) =>
      this.request<VetsListResponse[], ProblemDetails>({
        path: `/vetslist/batch-get`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description <br/><br/>Permission validation attribute: AuthorizePropertyAttribute<br/><br/>Validation descriptions:<br/><br/>Required permissions: vets-list:internal-notes<br/><br/>Field under validation: VetsInternalNotes<br/><br/><br/><br/>
     *
     * @tags VetsList
     * @name BatchUpdate
     * @request PUT:/vetslist/batch-update
     * @secure
     */
    batchUpdate: (
      data: VetsListBatchUpdateRequest[],
      params: RequestParams = {},
    ) =>
      this.request<ActionResult, ProblemDetails>({
        path: `/vetslist/batch-update`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags VetsList
     * @name GetIsAllowedToComeOff
     * @request GET:/vetslist/{vetsListId}/is-allowed-come-off
     * @deprecated
     * @secure
     */
    getIsAllowedToComeOff: (
      vetsListId: string,
      query?: {
        /** @format date */
        dateToComeOffList?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<IsAllowedToComeOffResult, ProblemDetails>({
        path: `/vetslist/${vetsListId}/is-allowed-come-off`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags VetsList
     * @name GetIsAllowedToComeOff2
     * @request GET:/vetslist/is-allowed-come-off
     * @originalName getIsAllowedToComeOff
     * @duplicate
     * @secure
     */
    getIsAllowedToComeOff2: (
      query: {
        vetsListIds: string[];
        /** @format date */
        dateToComeOffList?: string | null;
      },
      params: RequestParams = {},
    ) =>
      this.request<IsAllowedToComeOffResult[], ProblemDetails>({
        path: `/vetslist/is-allowed-come-off`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags VetsList
     * @name GetOffList
     * @request POST:/vetslist/get-off-list
     * @secure
     */
    getOffList: (
      data: HorseGetOffVetsListRequest,
      params: RequestParams = {},
    ) =>
      this.request<ActionResult, ActionResult | ProblemDetails>({
        path: `/vetslist/get-off-list`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags VetsList
     * @name ExtendStay
     * @request POST:/vetslist/extend-stay
     * @secure
     */
    extendStay: (data: HorseExtendStayRequest, params: RequestParams = {}) =>
      this.request<ActionResult, ActionResult | ProblemDetails>({
        path: `/vetslist/extend-stay`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description <br/><br/>Permission validation attribute: AuthorizePropertyAttribute<br/><br/>Validation descriptions:<br/><br/>Required permissions: vets-list:internal-notes<br/><br/>Field under validation: VetsInternalNotes<br/><br/><br/><br/>
     *
     * @tags VetsList
     * @name GetById
     * @request GET:/vetslist/{vetsListId}
     * @secure
     */
    getById: (vetsListId: string, params: RequestParams = {}) =>
      this.request<VetsListResponse, ProblemDetails>({
        path: `/vetslist/${vetsListId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description <br/><br/>Permission validation attribute: AuthorizePropertyAttribute<br/><br/>Validation descriptions:<br/><br/>Required permissions: vets-list:internal-notes<br/><br/>Field under validation: VetsInternalNotes<br/><br/><br/><br/>
     *
     * @tags VetsList
     * @name Update
     * @request PUT:/vetslist/{vetsListId}
     * @secure
     */
    update: (
      vetsListId: string,
      data: VetsListPutRequest,
      params: RequestParams = {},
    ) =>
      this.request<VetsListResponse, ProblemDetails>({
        path: `/vetslist/${vetsListId}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description <br/><br/>Permission validation attribute: AuthorizePropertyAttribute<br/><br/>Validation descriptions:<br/><br/>Required permissions: vets-list:internal-notes<br/><br/>Field under validation: VetsInternalNotes<br/><br/><br/><br/>
     *
     * @tags VetsList
     * @name Patch
     * @request PATCH:/vetslist/{vetsListId}
     * @secure
     */
    patch: (
      vetsListId: string,
      data: VetsListPatchRequest,
      params: RequestParams = {},
    ) =>
      this.request<VetsListResponse, ProblemDetails>({
        path: `/vetslist/${vetsListId}`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description <br/><br/>Permission validation attribute: AuthorizePropertyAttribute<br/><br/>Validation descriptions:<br/><br/>Required permissions: vets-list:internal-notes<br/><br/>Field under validation: VetsInternalNotes<br/><br/><br/><br/>
     *
     * @tags VetsList
     * @name Add
     * @request POST:/vetslist
     * @secure
     */
    add: (data: VetsListRequest, params: RequestParams = {}) =>
      this.request<VetsListResponse, VetsListResponse | ProblemDetails>({
        path: `/vetslist`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags VetsList
     * @name DeleteWithReason
     * @request DELETE:/vetslist/{vetsListId}/delete-reason
     * @secure
     */
    deleteWithReason: (
      vetsListId: string,
      data: string,
      params: RequestParams = {},
    ) =>
      this.request<ActionResult, ProblemDetails>({
        path: `/vetslist/${vetsListId}/delete-reason`,
        method: "DELETE",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags VetsList
     * @name GetMinDuration
     * @summary Retrieves the minimum duration for a specific veterinarian list entry associated with a horse.
     * @request GET:/vetslist/get-min-duration/{horseId}/{reason}
     * @secure
     */
    getMinDuration: (
      horseId: string,
      reason: VetsListReason,
      query?: {
        /**
         * The optional date for filtering the duration. Defaults to today if not provided.
         * @format date
         */
        onDate?: string;
        /** The unique identifier of the veterinarian list. */
        vetListId?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<VetsListDurationModel, ProblemDetails>({
        path: `/vetslist/get-min-duration/${horseId}/${reason}`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description <br/><br/>Permission validation attribute: AuthorizePropertyAttribute<br/><br/>Validation descriptions:<br/><br/>Required permissions: vets-list:internal-notes<br/><br/>Field under validation: VetsInternalNotes<br/><br/><br/><br/>
     *
     * @tags VetsList
     * @name BatchGetByHorses
     * @summary Retrieves a list of veterinarian records for multiple horses.
     * @request PUT:/vetslist/batch-get-by-horses
     * @secure
     */
    batchGetByHorses: (data: string[], params: RequestParams = {}) =>
      this.request<VetsListResponse[], ProblemDetails>({
        path: `/vetslist/batch-get-by-horses`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description <br/><br/>Permission validation attribute: AuthorizePropertyAttribute<br/><br/>Validation descriptions:<br/><br/>Required permissions: vets-list:internal-notes<br/><br/>Field under validation: VetsInternalNotes<br/><br/><br/><br/>
     *
     * @tags VetsList
     * @name BatchGetByHorsesAsync
     * @summary Retrieves a list of veterinarian records for multiple horses based on search requests.
     * @request POST:/vetslist/horse
     * @secure
     */
    batchGetByHorsesAsync: (
      data: VetsListHorseSearchRequest[],
      params: RequestParams = {},
    ) =>
      this.request<VetsListResponse[], VetsListResponse[] | ProblemDetails>({
        path: `/vetslist/horse`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description <br/><br/>Permission validation attribute: AuthorizePropertyAttribute<br/><br/>Validation descriptions:<br/><br/>Required permissions: vets-list:internal-notes<br/><br/>Field under validation: VetsInternalNotes<br/><br/><br/><br/>
     *
     * @tags VetsList
     * @name GetExtendSearch
     * @summary Performs an extended search for vet lists based on provided query parameters.
     * @request GET:/vetslist/extend-search
     * @secure
     */
    getExtendSearch: (
      query?: {
        includeDeleted?: boolean;
        isEnforced?: boolean | null;
        isRegVetClearRequired?: boolean | null;
        /** @format date */
        "releaseDateRange.startDate"?: string;
        /** @format date */
        "releaseDateRange.endDate"?: string;
        /** @format date */
        "dateToComeOffListDateRange.startDate"?: string;
        /** @format date */
        "dateToComeOffListDateRange.endDate"?: string;
        /** @format date */
        "datePlacedOnListDateRange.startDate"?: string;
        /** @format date */
        "datePlacedOnListDateRange.endDate"?: string;
        personIds?: string[] | null;
        horseIds?: string[] | null;
        locationIds?: string[] | null;
        horseMedicalIds?: string[] | null;
        tjcIds?: number[] | null;
        reasons?: VetsListReason[] | null;
        searchText?: string | null;
        /** @format date-time */
        startDate?: string | null;
        /** @format date-time */
        endDate?: string | null;
        sortBy?: string | null;
        /** @format int32 */
        sortDirection?: number;
        isAscSort?: boolean;
        /** @format int32 */
        page?: number;
        /** @format int32 */
        pageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<VetsListResponse[], ProblemDetails>({
        path: `/vetslist/extend-search`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),
  };
  workout = {
    /**
     * No description
     *
     * @tags Workout
     * @name GetAllAsync
     * @request GET:/workout/search
     * @secure
     */
    getAllAsync: (
      query?: {
        horseIds?: string[];
        searchText?: string;
        locationId?: string;
        raceNumber?: string;
        /** @format date-time */
        startDate?: string;
        /** @format date-time */
        endDate?: string;
        sortBy?: string;
        /** @format int32 */
        sortDirection?: number;
        isAscSort?: boolean;
        /** @format int32 */
        page?: number;
        /** @format int32 */
        pageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<WorkoutResponse[], ProblemDetails>({
        path: `/workout/search`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),
  };
  workqueue = {
    /**
     * No description
     *
     * @tags WorkQueue
     * @name SearchWorkQueueByListOfHorseMedicalId
     * @summary Search WorkQueue by list of HisaHorseMedicalId.
     * @request GET:/workqueue/search/workqueue/by-hisahorsemedicalids
     * @secure
     */
    searchWorkQueueByListOfHorseMedicalId: (
      query?: {
        /** List of HisaHorseMedicalId. */
        hisaHorseMedicalIds?: string[];
        sortBy?: string;
        /** @format int32 */
        sortDirection?: number;
        isAscSort?: boolean;
        /** @format int32 */
        page?: number;
        /** @format int32 */
        pageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<WorkQueueDto[], ProblemDetails>({
        path: `/workqueue/search/workqueue/by-hisahorsemedicalids`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags WorkQueue
     * @name SearchWorkQueueByHorseMedicalId
     * @summary Search WorkQueue by HisaHorseMedicalId.
     * @request GET:/workqueue/search/workqueue/{hisaHorseMedicalId}/{dateStart}/{dateEnd}/{status}
     * @secure
     */
    searchWorkQueueByHorseMedicalId: (
      hisaHorseMedicalId: string,
      dateStart: string,
      dateEnd: string,
      status: string,
      params: RequestParams = {},
    ) =>
      this.request<string[], ProblemDetails>({
        path: `/workqueue/search/workqueue/${hisaHorseMedicalId}/${dateStart}/${dateEnd}/${status}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags WorkQueue
     * @name SearchWorkQueueByStatus
     * @summary Search WorkQueue by Status.
     * @request GET:/workqueue/search/workqueue/by-statuses
     * @secure
     */
    searchWorkQueueByStatus: (
      query?: {
        /** List of WorkQueue Status. */
        statuses?: string[];
        /** Document type, which should be excluded from the collection of WorkQueue. */
        excludeDocTypes?: string[];
        sortBy?: string;
        /** @format int32 */
        sortDirection?: number;
        isAscSort?: boolean;
        /** @format int32 */
        page?: number;
        /** @format int32 */
        pageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<WorkQueueDto[], ProblemDetails>({
        path: `/workqueue/search/workqueue/by-statuses`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags WorkQueue
     * @name SearchWorkQueue
     * @summary Search WorkQueue.
     * @request POST:/workqueue/search/{searchText}
     * @secure
     */
    searchWorkQueue: (
      searchText: string,
      data: FilterDefinition[],
      query?: {
        sortBy?: string;
        /** @format int32 */
        sortDirection?: number;
        isAscSort?: boolean;
        /** @format int32 */
        page?: number;
        /** @format int32 */
        pageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<WorkQueueDto[], WorkQueueDto[] | ProblemDetails>({
        path: `/workqueue/search/${searchText}`,
        method: "POST",
        query: query,
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags WorkQueue
     * @name GetWorkQueueByIds
     * @summary Search WorkQueues.
     * @request POST:/workqueue/getbyids
     * @secure
     */
    getWorkQueueByIds: (
      query?: {
        /** List of WQ ids */
        ids?: string[];
        sortBy?: string;
        /** @format int32 */
        sortDirection?: number;
        isAscSort?: boolean;
        /** @format int32 */
        page?: number;
        /** @format int32 */
        pageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<WorkQueueDto[], WorkQueueDto[] | ProblemDetails>({
        path: `/workqueue/getbyids`,
        method: "POST",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags WorkQueue
     * @name GetAllWorkQueue
     * @summary Return all WorkQueue.
     * @request GET:/workqueue/search/all
     * @secure
     */
    getAllWorkQueue: (
      query?: {
        sortBy?: string;
        /** @format int32 */
        sortDirection?: number;
        isAscSort?: boolean;
        /** @format int32 */
        page?: number;
        /** @format int32 */
        pageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<WorkQueueDto[], ProblemDetails>({
        path: `/workqueue/search/all`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags WorkQueue
     * @name GetWorkQueueById
     * @summary Return WorkQueue by workQueueId.
     * @request GET:/workqueue/{workQueueId}
     * @secure
     */
    getWorkQueueById: (workQueueId: string, params: RequestParams = {}) =>
      this.request<WorkQueueDto, ProblemDetails>({
        path: `/workqueue/${workQueueId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags WorkQueue
     * @name UpdateWorkQueue
     * @summary Update WorkQueue.
     * @request PUT:/workqueue/{workQueueId}
     * @secure
     */
    updateWorkQueue: (
      workQueueId: string,
      data: WorkQueueDto,
      params: RequestParams = {},
    ) =>
      this.request<WorkQueueDto, ProblemDetails>({
        path: `/workqueue/${workQueueId}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags WorkQueue
     * @name DeleteWorkQueue
     * @summary Delete WorkQueue.
     * @request DELETE:/workqueue/{workQueueId}
     * @secure
     */
    deleteWorkQueue: (workQueueId: string, params: RequestParams = {}) =>
      this.request<ActionResult, ProblemDetails>({
        path: `/workqueue/${workQueueId}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags WorkQueue
     * @name AddNewWorkQueue
     * @summary Insert new WorkQueue.
     * @request POST:/workqueue
     * @secure
     */
    addNewWorkQueue: (data: WorkQueueDto, params: RequestParams = {}) =>
      this.request<WorkQueueDto, WorkQueueDto | ProblemDetails>({
        path: `/workqueue`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags WorkQueue
     * @name SendEmailWithAttachment
     * @summary Send emails.
     * @request POST:/workqueue/sendemail
     * @secure
     */
    sendEmailWithAttachment: (
      data: {
        /** File(s) which should be attached. */
        files?: File[];
      },
      query?: {
        /** Sender email. */
        email?: string;
        /** Email`s subject. */
        subject?: string;
        /** Email`s body. */
        bodyString?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<ActionResult, ActionResult | ProblemDetails>({
        path: `/workqueue/sendemail`,
        method: "POST",
        query: query,
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags WorkQueue
     * @name UploadDocument
     * @summary Upload document
     * @request POST:/workqueue/{workQueueId}/attachment/upload
     * @secure
     */
    uploadDocument: (
      workQueueId: string,
      data: {
        /**
         * File which should be upload.
         * @format binary
         */
        file?: File;
      },
      query?: {
        /**
         * Optional parameter. Used to specify prefix for file name.
         * @default ""
         */
        fileNamePrefix?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<ActionResult, ActionResult | ProblemDetails>({
        path: `/workqueue/${workQueueId}/attachment/upload`,
        method: "POST",
        query: query,
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags WorkQueue
     * @name GetAttachmentsMetaData
     * @summary Get list of documents attached to the specified WorkQueue
     * @request GET:/workqueue/{workQueueId}/attachment/get-attachment-metadata
     * @secure
     */
    getAttachmentsMetaData: (workQueueId: string, params: RequestParams = {}) =>
      this.request<WorkQueueAttachmentMetaData[], ProblemDetails>({
        path: `/workqueue/${workQueueId}/attachment/get-attachment-metadata`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags WorkQueue
     * @name DeleteAttachement
     * @summary Delete document attached to the specified WorkQueue
     * @request DELETE:/workqueue/{workQueueId}/attachment/{documentId}/remove
     * @secure
     */
    deleteAttachement: (
      workQueueId: string,
      documentId: string,
      params: RequestParams = {},
    ) =>
      this.request<ActionResult, ProblemDetails>({
        path: `/workqueue/${workQueueId}/attachment/${documentId}/remove`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  workqueuedoc = {
    /**
     * No description
     *
     * @tags WorkQueueDoc
     * @name WorkQueueDocSearch
     * @summary Search for WorkQueueDoc.
     * @request GET:/workqueuedoc/workqueuedocsearch/{searchText}
     * @secure
     */
    workQueueDocSearch: (
      searchText: string,
      query?: {
        sortBy?: string;
        /** @format int32 */
        sortDirection?: number;
        isAscSort?: boolean;
        /** @format int32 */
        page?: number;
        /** @format int32 */
        pageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<WorkQueueDocDto[], ProblemDetails>({
        path: `/workqueuedoc/workqueuedocsearch/${searchText}`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags WorkQueueDoc
     * @name GetAllWorkQueueDocs
     * @summary Return all WorkQueueDocs.
     * @request GET:/workqueuedoc/workqueuedocsearch/all
     * @secure
     */
    getAllWorkQueueDocs: (
      query?: {
        sortBy?: string;
        /** @format int32 */
        sortDirection?: number;
        isAscSort?: boolean;
        /** @format int32 */
        page?: number;
        /** @format int32 */
        pageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<WorkQueueDocDto[], ProblemDetails>({
        path: `/workqueuedoc/workqueuedocsearch/all`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags WorkQueueDoc
     * @name GetWorkQueueDocByDocType
     * @summary Return WorkQueueDoc by workQueueDocType.
     * @request GET:/workqueuedoc/{workQueueDocType}
     * @secure
     */
    getWorkQueueDocByDocType: (
      workQueueDocType: WorkQueueDocType,
      params: RequestParams = {},
    ) =>
      this.request<WorkQueueDocDto, ProblemDetails>({
        path: `/workqueuedoc/${workQueueDocType}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags WorkQueueDoc
     * @name UpdateWorkQueue
     * @summary Update WorkQueueDoc.
     * @request PUT:/workqueuedoc/{workQueueDocType}
     * @secure
     */
    updateWorkQueue: (
      workQueueDocType: WorkQueueDocType,
      data: WorkQueueDocDto,
      params: RequestParams = {},
    ) =>
      this.request<WorkQueueDocDto, ProblemDetails>({
        path: `/workqueuedoc/${workQueueDocType}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags WorkQueueDoc
     * @name AddNewWorkQueueDoc
     * @summary Insert new WorkQueueDoc.
     * @request POST:/workqueuedoc
     * @secure
     */
    addNewWorkQueueDoc: (data: WorkQueueDocDto, params: RequestParams = {}) =>
      this.request<WorkQueueDocDto, WorkQueueDocDto | ProblemDetails>({
        path: `/workqueuedoc`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags WorkQueueDoc
     * @name DeleteWorkQueue
     * @summary Delete WorkQueueDoc.
     * @request DELETE:/workqueuedoc/{workQueueId}
     * @secure
     */
    deleteWorkQueue: (
      workQueueId: string,
      query?: {
        /** WorkQueueDoc workQueueDocType. */
        workQueueDocType?: WorkQueueDocType;
      },
      params: RequestParams = {},
    ) =>
      this.request<ActionResult, ProblemDetails>({
        path: `/workqueuedoc/${workQueueId}`,
        method: "DELETE",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),
  };
}
