/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A coordinate is an array of positions. */
  Coordinates: { input: any; output: any; }
  /** The `Date` scalar represents an ISO-8601 compliant date type. */
  Date: { input: any; output: any; }
  /** The `DateTime` scalar represents an ISO-8601 compliant date time type. */
  DateTime: { input: any; output: any; }
  Geometry: { input: any; output: any; }
  /** The `Long` scalar type represents non-fractional signed whole 64-bit numeric values. Long can represent values between -(2^63) and 2^63 - 1. */
  Long: { input: any; output: any; }
  /** A position is an array of numbers. There MUST be two or more elements. The first two elements are longitude and latitude, or easting and northing, precisely in that order and using decimal numbers. Altitude or elevation MAY be included as an optional third element. */
  Position: { input: any; output: any; }
  /** The `TimeSpan` scalar represents an ISO-8601 compliant duration type. */
  TimeSpan: { input: any; output: any; }
};

export type Address = {
  __typename?: 'Address';
  city: Scalars['String']['output'];
  country: Scalars['String']['output'];
  state: Scalars['String']['output'];
  street: Scalars['String']['output'];
  unitAptBoxNumber: Scalars['String']['output'];
  zipPostalCode: Scalars['String']['output'];
};

export type AddressFilterInput = {
  and?: InputMaybe<Array<AddressFilterInput>>;
  city?: InputMaybe<StringOperationFilterInput>;
  country?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<AddressFilterInput>>;
  state?: InputMaybe<StringOperationFilterInput>;
  street?: InputMaybe<StringOperationFilterInput>;
  unitAptBoxNumber?: InputMaybe<StringOperationFilterInput>;
  zipPostalCode?: InputMaybe<StringOperationFilterInput>;
};

export type AddressSortInput = {
  city?: InputMaybe<SortEnumType>;
  country?: InputMaybe<SortEnumType>;
  state?: InputMaybe<SortEnumType>;
  street?: InputMaybe<SortEnumType>;
  unitAptBoxNumber?: InputMaybe<SortEnumType>;
  zipPostalCode?: InputMaybe<SortEnumType>;
};

export type AiProcessing = {
  __typename?: 'AiProcessing';
  classifiedAsType: Scalars['String']['output'];
  date: Scalars['DateTime']['output'];
  humanOutputRectype: Scalars['String']['output'];
  humanRequired: Scalars['Boolean']['output'];
  incompleteInformation: Scalars['Boolean']['output'];
  mismatch: Scalars['Boolean']['output'];
  modelName: Scalars['String']['output'];
  modelOutputMissingData: Scalars['Boolean']['output'];
  modelOutputRecType: Scalars['String']['output'];
  modelVersion: Scalars['String']['output'];
  submittedRecType: HorseTreatmentType;
};

export type AiProcessingFilterInput = {
  and?: InputMaybe<Array<AiProcessingFilterInput>>;
  classifiedAsType?: InputMaybe<StringOperationFilterInput>;
  date?: InputMaybe<DateTimeOperationFilterInput>;
  humanOutputRectype?: InputMaybe<StringOperationFilterInput>;
  humanRequired?: InputMaybe<BooleanOperationFilterInput>;
  incompleteInformation?: InputMaybe<BooleanOperationFilterInput>;
  mismatch?: InputMaybe<BooleanOperationFilterInput>;
  modelName?: InputMaybe<StringOperationFilterInput>;
  modelOutputMissingData?: InputMaybe<BooleanOperationFilterInput>;
  modelOutputRecType?: InputMaybe<StringOperationFilterInput>;
  modelVersion?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<AiProcessingFilterInput>>;
  submittedRecType?: InputMaybe<HorseTreatmentTypeOperationFilterInput>;
};

export type BasicHorse = {
  __typename?: 'BasicHorse';
  horseId: Scalars['String']['output'];
  name?: Maybe<Scalars['String']['output']>;
};

export type BasicHorseFilterInput = {
  and?: InputMaybe<Array<BasicHorseFilterInput>>;
  horseId?: InputMaybe<StringOperationFilterInput>;
  name?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<BasicHorseFilterInput>>;
};

export type BasicLocationEntity = {
  __typename?: 'BasicLocationEntity';
  addresses: Array<LocationAddressEntity>;
  contacts: Array<LocationContactsEntity>;
  dateExtensions: Array<LocationScheduleExceptionEntity>;
  locationId: Scalars['String']['output'];
  name?: Maybe<Scalars['String']['output']>;
  schedules: Array<LocationScheduleEntity>;
};

export type BasicLocationEntityFilterInput = {
  addresses?: InputMaybe<ListFilterInputTypeOfLocationAddressEntityFilterInput>;
  and?: InputMaybe<Array<BasicLocationEntityFilterInput>>;
  contacts?: InputMaybe<ListFilterInputTypeOfLocationContactsEntityFilterInput>;
  dateExtensions?: InputMaybe<ListFilterInputTypeOfLocationScheduleExceptionEntityFilterInput>;
  locationId?: InputMaybe<StringOperationFilterInput>;
  name?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<BasicLocationEntityFilterInput>>;
  schedules?: InputMaybe<ListFilterInputTypeOfLocationScheduleEntityFilterInput>;
};

export type BasicLocationEntitySortInput = {
  locationId?: InputMaybe<SortEnumType>;
  name?: InputMaybe<SortEnumType>;
};

export type BooleanOperationFilterInput = {
  eq?: InputMaybe<Scalars['Boolean']['input']>;
  neq?: InputMaybe<Scalars['Boolean']['input']>;
};

export enum CalledInType {
  AttendingVet = 'ATTENDING_VET',
  Office = 'OFFICE',
  Other = 'OTHER',
  RegVet = 'REG_VET',
  Steward = 'STEWARD',
  Trainer = 'TRAINER'
}

export type CalledInTypeOperationFilterInput = {
  eq?: InputMaybe<CalledInType>;
  in?: InputMaybe<Array<CalledInType>>;
  neq?: InputMaybe<CalledInType>;
  nin?: InputMaybe<Array<CalledInType>>;
};

export type CanRaceHorseResponse = {
  __typename?: 'CanRaceHorseResponse';
  canEnter: Scalars['Boolean']['output'];
  canEnterReason?: Maybe<Scalars['String']['output']>;
  canRace: Scalars['Boolean']['output'];
  canWork: Scalars['Boolean']['output'];
  canWorkReason?: Maybe<Scalars['String']['output']>;
  date: Scalars['Date']['output'];
  id: Scalars['String']['output'];
  reason?: Maybe<Scalars['String']['output']>;
};

/** Information about the offset pagination. */
export type CollectionSegmentInfo = {
  __typename?: 'CollectionSegmentInfo';
  /** Indicates whether more items exist following the set defined by the clients arguments. */
  hasNextPage: Scalars['Boolean']['output'];
  /** Indicates whether more items exist prior the set defined by the clients arguments. */
  hasPreviousPage: Scalars['Boolean']['output'];
};

export type CoordinateEqualityComparerFilterInput = {
  and?: InputMaybe<Array<CoordinateEqualityComparerFilterInput>>;
  or?: InputMaybe<Array<CoordinateEqualityComparerFilterInput>>;
};

export type CoordinateFilterInput = {
  and?: InputMaybe<Array<CoordinateFilterInput>>;
  coordinateValue?: InputMaybe<CoordinateFilterInput>;
  isValid?: InputMaybe<BooleanOperationFilterInput>;
  m?: InputMaybe<FloatOperationFilterInput>;
  or?: InputMaybe<Array<CoordinateFilterInput>>;
  x?: InputMaybe<FloatOperationFilterInput>;
  y?: InputMaybe<FloatOperationFilterInput>;
  z?: InputMaybe<FloatOperationFilterInput>;
};

export type CoordinateSequenceFactoryFilterInput = {
  and?: InputMaybe<Array<CoordinateSequenceFactoryFilterInput>>;
  or?: InputMaybe<Array<CoordinateSequenceFactoryFilterInput>>;
  ordinates?: InputMaybe<OrdinatesOperationFilterInput>;
};

export type CoordinateSequenceFilterInput = {
  and?: InputMaybe<Array<CoordinateSequenceFilterInput>>;
  count?: InputMaybe<IntOperationFilterInput>;
  dimension?: InputMaybe<IntOperationFilterInput>;
  first?: InputMaybe<CoordinateFilterInput>;
  hasM?: InputMaybe<BooleanOperationFilterInput>;
  hasZ?: InputMaybe<BooleanOperationFilterInput>;
  last?: InputMaybe<CoordinateFilterInput>;
  mOrdinateIndex?: InputMaybe<IntOperationFilterInput>;
  measures?: InputMaybe<IntOperationFilterInput>;
  or?: InputMaybe<Array<CoordinateSequenceFilterInput>>;
  ordinates?: InputMaybe<OrdinatesOperationFilterInput>;
  spatial?: InputMaybe<IntOperationFilterInput>;
  zOrdinateIndex?: InputMaybe<IntOperationFilterInput>;
};

export type CoveredHorseExtendedResponse = {
  __typename?: 'CoveredHorseExtendedResponse';
  allMessageCount: Scalars['Int']['output'];
  canRace?: Maybe<CanRaceHorseResponse>;
  clearanceInfo?: Maybe<HorseVetClearanceInfoResponse>;
  daysSinceLastRace?: Maybe<Scalars['Int']['output']>;
  daysUtilEarliestOff?: Maybe<Scalars['Int']['output']>;
  lastRace?: Maybe<Scalars['Date']['output']>;
  unreadMessageCount: Scalars['Int']['output'];
  /** @deprecated Use VetListInfo instead */
  vetListEarliestOffDate?: Maybe<Scalars['Date']['output']>;
  vetListInfo?: Maybe<HorseVetListInfoResponse>;
};

export type DateOperationFilterInput = {
  eq?: InputMaybe<Scalars['Date']['input']>;
  gt?: InputMaybe<Scalars['Date']['input']>;
  gte?: InputMaybe<Scalars['Date']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Date']['input']>>>;
  lt?: InputMaybe<Scalars['Date']['input']>;
  lte?: InputMaybe<Scalars['Date']['input']>;
  neq?: InputMaybe<Scalars['Date']['input']>;
  ngt?: InputMaybe<Scalars['Date']['input']>;
  ngte?: InputMaybe<Scalars['Date']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['Date']['input']>>>;
  nlt?: InputMaybe<Scalars['Date']['input']>;
  nlte?: InputMaybe<Scalars['Date']['input']>;
};

export type DateRangeInput = {
  endDate?: InputMaybe<Scalars['Date']['input']>;
  startDate?: InputMaybe<Scalars['Date']['input']>;
};

export type DateTimeOperationFilterInput = {
  eq?: InputMaybe<Scalars['DateTime']['input']>;
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  neq?: InputMaybe<Scalars['DateTime']['input']>;
  ngt?: InputMaybe<Scalars['DateTime']['input']>;
  ngte?: InputMaybe<Scalars['DateTime']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  nlt?: InputMaybe<Scalars['DateTime']['input']>;
  nlte?: InputMaybe<Scalars['DateTime']['input']>;
};

export enum DayOfWeek {
  Friday = 'FRIDAY',
  Monday = 'MONDAY',
  Saturday = 'SATURDAY',
  Sunday = 'SUNDAY',
  Thursday = 'THURSDAY',
  Tuesday = 'TUESDAY',
  Wednesday = 'WEDNESDAY'
}

export type DayOfWeekOperationFilterInput = {
  eq?: InputMaybe<DayOfWeek>;
  in?: InputMaybe<Array<DayOfWeek>>;
  neq?: InputMaybe<DayOfWeek>;
  nin?: InputMaybe<Array<DayOfWeek>>;
};

export enum Dimension {
  Collapse = 'COLLAPSE',
  Curve = 'CURVE',
  Dontcare = 'DONTCARE',
  False = 'FALSE',
  Point = 'POINT',
  Surface = 'SURFACE',
  True = 'TRUE'
}

export type DimensionOperationFilterInput = {
  eq?: InputMaybe<Dimension>;
  in?: InputMaybe<Array<Dimension>>;
  neq?: InputMaybe<Dimension>;
  nin?: InputMaybe<Array<Dimension>>;
};

export type DiscussionEntity = {
  __typename?: 'DiscussionEntity';
  createdAt: Scalars['DateTime']['output'];
  createdBy: Scalars['String']['output'];
  discussionId: Scalars['Int']['output'];
  discussionType: DiscussionType;
  isArchived: Scalars['Boolean']['output'];
  isDeleted: Scalars['Boolean']['output'];
  members: Array<DiscussionMemberEntity>;
  messages: Array<DiscussionMessageEntity>;
  title?: Maybe<Scalars['String']['output']>;
};

export type DiscussionEntityFilterInput = {
  and?: InputMaybe<Array<DiscussionEntityFilterInput>>;
  createdAt?: InputMaybe<DateTimeOperationFilterInput>;
  createdBy?: InputMaybe<StringOperationFilterInput>;
  discussionId?: InputMaybe<IntOperationFilterInput>;
  discussionType?: InputMaybe<DiscussionTypeOperationFilterInput>;
  isArchived?: InputMaybe<BooleanOperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  members?: InputMaybe<ListFilterInputTypeOfDiscussionMemberEntityFilterInput>;
  messages?: InputMaybe<ListFilterInputTypeOfDiscussionMessageEntityFilterInput>;
  or?: InputMaybe<Array<DiscussionEntityFilterInput>>;
  title?: InputMaybe<StringOperationFilterInput>;
};

export type DiscussionMemberEntity = {
  __typename?: 'DiscussionMemberEntity';
  addedAt: Scalars['DateTime']['output'];
  discussionId: Scalars['Int']['output'];
  discussionMemberId: Scalars['Int']['output'];
  personId: Scalars['String']['output'];
  readMessageId?: Maybe<Scalars['Long']['output']>;
};

export type DiscussionMemberEntityFilterInput = {
  addedAt?: InputMaybe<DateTimeOperationFilterInput>;
  and?: InputMaybe<Array<DiscussionMemberEntityFilterInput>>;
  discussionId?: InputMaybe<IntOperationFilterInput>;
  discussionMemberId?: InputMaybe<IntOperationFilterInput>;
  or?: InputMaybe<Array<DiscussionMemberEntityFilterInput>>;
  personId?: InputMaybe<StringOperationFilterInput>;
  readMessageId?: InputMaybe<LongOperationFilterInput>;
};

export type DiscussionMessageAttachmentEntity = {
  __typename?: 'DiscussionMessageAttachmentEntity';
  discussionId: Scalars['Int']['output'];
  discussionMessageAttachmentId: Scalars['Long']['output'];
  discussionMessageId: Scalars['Long']['output'];
  documentUuid: Scalars['String']['output'];
  isDeleted: Scalars['Boolean']['output'];
};

export type DiscussionMessageAttachmentEntityFilterInput = {
  and?: InputMaybe<Array<DiscussionMessageAttachmentEntityFilterInput>>;
  discussionId?: InputMaybe<IntOperationFilterInput>;
  discussionMessageAttachmentId?: InputMaybe<LongOperationFilterInput>;
  discussionMessageId?: InputMaybe<LongOperationFilterInput>;
  documentUuid?: InputMaybe<StringOperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  or?: InputMaybe<Array<DiscussionMessageAttachmentEntityFilterInput>>;
};

export type DiscussionMessageEntity = {
  __typename?: 'DiscussionMessageEntity';
  attachments: Array<DiscussionMessageAttachmentEntity>;
  content: Scalars['String']['output'];
  discussionId: Scalars['Int']['output'];
  discussionMessageId: Scalars['Long']['output'];
  isDeleted: Scalars['Boolean']['output'];
  personId: Scalars['String']['output'];
  sentAt: Scalars['DateTime']['output'];
};

export type DiscussionMessageEntityFilterInput = {
  and?: InputMaybe<Array<DiscussionMessageEntityFilterInput>>;
  attachments?: InputMaybe<ListFilterInputTypeOfDiscussionMessageAttachmentEntityFilterInput>;
  content?: InputMaybe<StringOperationFilterInput>;
  discussionId?: InputMaybe<IntOperationFilterInput>;
  discussionMessageId?: InputMaybe<LongOperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  or?: InputMaybe<Array<DiscussionMessageEntityFilterInput>>;
  personId?: InputMaybe<StringOperationFilterInput>;
  sentAt?: InputMaybe<DateTimeOperationFilterInput>;
};

export enum DiscussionType {
  Personal = 'PERSONAL'
}

export type DiscussionTypeOperationFilterInput = {
  eq?: InputMaybe<DiscussionType>;
  in?: InputMaybe<Array<DiscussionType>>;
  neq?: InputMaybe<DiscussionType>;
  nin?: InputMaybe<Array<DiscussionType>>;
};

export type EnvelopeFilterInput = {
  and?: InputMaybe<Array<EnvelopeFilterInput>>;
  area?: InputMaybe<FloatOperationFilterInput>;
  centre?: InputMaybe<CoordinateFilterInput>;
  diameter?: InputMaybe<FloatOperationFilterInput>;
  height?: InputMaybe<FloatOperationFilterInput>;
  isNull?: InputMaybe<BooleanOperationFilterInput>;
  maxExtent?: InputMaybe<FloatOperationFilterInput>;
  maxX?: InputMaybe<FloatOperationFilterInput>;
  maxY?: InputMaybe<FloatOperationFilterInput>;
  minExtent?: InputMaybe<FloatOperationFilterInput>;
  minX?: InputMaybe<FloatOperationFilterInput>;
  minY?: InputMaybe<FloatOperationFilterInput>;
  or?: InputMaybe<Array<EnvelopeFilterInput>>;
  width?: InputMaybe<FloatOperationFilterInput>;
};

export type FloatOperationFilterInput = {
  eq?: InputMaybe<Scalars['Float']['input']>;
  gt?: InputMaybe<Scalars['Float']['input']>;
  gte?: InputMaybe<Scalars['Float']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  lt?: InputMaybe<Scalars['Float']['input']>;
  lte?: InputMaybe<Scalars['Float']['input']>;
  neq?: InputMaybe<Scalars['Float']['input']>;
  ngt?: InputMaybe<Scalars['Float']['input']>;
  ngte?: InputMaybe<Scalars['Float']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  nlt?: InputMaybe<Scalars['Float']['input']>;
  nlte?: InputMaybe<Scalars['Float']['input']>;
};

export enum GeoJsonGeometryType {
  GeometryCollection = 'GeometryCollection',
  LineString = 'LineString',
  MultiLineString = 'MultiLineString',
  MultiPoint = 'MultiPoint',
  MultiPolygon = 'MultiPolygon',
  Point = 'Point',
  Polygon = 'Polygon'
}

export type GeoJsonInterface = {
  /** The minimum bounding box around the geometry object */
  bbox?: Maybe<Array<Maybe<Scalars['Float']['output']>>>;
  /** The coordinate reference system integer identifier */
  crs?: Maybe<Scalars['Int']['output']>;
  /** The geometry type of the GeoJson object */
  type: GeoJsonGeometryType;
};

export type GeoJsonLineStringInput = {
  /** The "coordinates" field is an array of two or more positions. */
  coordinates?: InputMaybe<Array<InputMaybe<Scalars['Position']['input']>>>;
  /** The coordinate reference system integer identifier */
  crs?: InputMaybe<Scalars['Int']['input']>;
  /** The geometry type of the GeoJson object */
  type?: InputMaybe<GeoJsonGeometryType>;
};

export type GeoJsonLineStringType = GeoJsonInterface & {
  __typename?: 'GeoJSONLineStringType';
  /** The minimum bounding box around the geometry object */
  bbox: Array<Scalars['Float']['output']>;
  /** The "coordinates" field is an array of two or more positions. */
  coordinates?: Maybe<Array<Maybe<Scalars['Position']['output']>>>;
  /** The coordinate reference system integer identifier */
  crs: Scalars['Int']['output'];
  /** The geometry type of the GeoJson object */
  type: GeoJsonGeometryType;
};

export type GeoJsonMultiLineStringInput = {
  /** The "coordinates" field is an array of LineString coordinate arrays. */
  coordinates?: InputMaybe<Array<InputMaybe<Array<InputMaybe<Scalars['Position']['input']>>>>>;
  /** The coordinate reference system integer identifier */
  crs?: InputMaybe<Scalars['Int']['input']>;
  /** The geometry type of the GeoJson object */
  type?: InputMaybe<GeoJsonGeometryType>;
};

export type GeoJsonMultiLineStringType = GeoJsonInterface & {
  __typename?: 'GeoJSONMultiLineStringType';
  /** The minimum bounding box around the geometry object */
  bbox: Array<Scalars['Float']['output']>;
  /** The "coordinates" field is an array of LineString coordinate arrays. */
  coordinates?: Maybe<Array<Maybe<Scalars['Position']['output']>>>;
  /** The coordinate reference system integer identifier */
  crs: Scalars['Int']['output'];
  /** The geometry type of the GeoJson object */
  type: GeoJsonGeometryType;
};

export type GeoJsonMultiPointInput = {
  /** The "coordinates" field is an array of positions. */
  coordinates?: InputMaybe<Array<InputMaybe<Scalars['Position']['input']>>>;
  /** The coordinate reference system integer identifier */
  crs?: InputMaybe<Scalars['Int']['input']>;
  /** The geometry type of the GeoJson object */
  type?: InputMaybe<GeoJsonGeometryType>;
};

export type GeoJsonMultiPointType = GeoJsonInterface & {
  __typename?: 'GeoJSONMultiPointType';
  /** The minimum bounding box around the geometry object */
  bbox: Array<Scalars['Float']['output']>;
  /** The "coordinates" field is an array of positions. */
  coordinates?: Maybe<Array<Maybe<Scalars['Position']['output']>>>;
  /** The coordinate reference system integer identifier */
  crs: Scalars['Int']['output'];
  /** The geometry type of the GeoJson object */
  type: GeoJsonGeometryType;
};

export type GeoJsonMultiPolygonInput = {
  /** The "coordinates" field is an array of Polygon coordinate arrays. */
  coordinates?: InputMaybe<Scalars['Coordinates']['input']>;
  /** The coordinate reference system integer identifier */
  crs?: InputMaybe<Scalars['Int']['input']>;
  /** The geometry type of the GeoJson object */
  type?: InputMaybe<GeoJsonGeometryType>;
};

export type GeoJsonMultiPolygonType = GeoJsonInterface & {
  __typename?: 'GeoJSONMultiPolygonType';
  /** The minimum bounding box around the geometry object */
  bbox: Array<Scalars['Float']['output']>;
  /** The "coordinates" field is an array of Polygon coordinate arrays. */
  coordinates?: Maybe<Scalars['Coordinates']['output']>;
  /** The coordinate reference system integer identifier */
  crs: Scalars['Int']['output'];
  /** The geometry type of the GeoJson object */
  type: GeoJsonGeometryType;
};

export type GeoJsonPointInput = {
  /** The "coordinates" field is a single position. */
  coordinates?: InputMaybe<Scalars['Position']['input']>;
  /** The coordinate reference system integer identifier */
  crs?: InputMaybe<Scalars['Int']['input']>;
  /** The geometry type of the GeoJson object */
  type?: InputMaybe<GeoJsonGeometryType>;
};

export type GeoJsonPointType = GeoJsonInterface & {
  __typename?: 'GeoJSONPointType';
  /** The minimum bounding box around the geometry object */
  bbox: Array<Scalars['Float']['output']>;
  /** The "coordinates" field is a single position. */
  coordinates?: Maybe<Scalars['Position']['output']>;
  /** The coordinate reference system integer identifier */
  crs: Scalars['Int']['output'];
  /** The geometry type of the GeoJson object */
  type: GeoJsonGeometryType;
};

export type GeoJsonPolygonInput = {
  /** The "coordinates" field MUST be an array of linear ring coordinate arrays. For Polygons with more than one of these rings, the first MUST be the exterior ring, and any others MUST be interior rings. The exterior ring bounds the surface, and the interior rings (if present) bound holes within the surface. */
  coordinates?: InputMaybe<Array<InputMaybe<Array<InputMaybe<Scalars['Position']['input']>>>>>;
  /** The coordinate reference system integer identifier */
  crs?: InputMaybe<Scalars['Int']['input']>;
  /** The geometry type of the GeoJson object */
  type?: InputMaybe<GeoJsonGeometryType>;
};

export type GeoJsonPolygonType = GeoJsonInterface & {
  __typename?: 'GeoJSONPolygonType';
  /** The minimum bounding box around the geometry object */
  bbox: Array<Scalars['Float']['output']>;
  /** The "coordinates" field MUST be an array of linear ring coordinate arrays. For Polygons with more than one of these rings, the first MUST be the exterior ring, and any others MUST be interior rings. The exterior ring bounds the surface, and the interior rings (if present) bound holes within the surface. */
  coordinates?: Maybe<Array<Maybe<Array<Maybe<Scalars['Position']['output']>>>>>;
  /** The coordinate reference system integer identifier */
  crs: Scalars['Int']['output'];
  /** The geometry type of the GeoJson object */
  type: GeoJsonGeometryType;
};

export type GeoLocation = {
  __typename?: 'GeoLocation';
  latitude: Scalars['Float']['output'];
  longitude: Scalars['Float']['output'];
  toQueryString: QueryString;
};


export type GeoLocationToQueryStringArgs = {
  nameOfContext: Scalars['String']['input'];
};

export type GeoLocationFilterInput = {
  and?: InputMaybe<Array<GeoLocationFilterInput>>;
  latitude?: InputMaybe<FloatOperationFilterInput>;
  longitude?: InputMaybe<FloatOperationFilterInput>;
  or?: InputMaybe<Array<GeoLocationFilterInput>>;
};

export type GeoLocationSortInput = {
  latitude?: InputMaybe<SortEnumType>;
  longitude?: InputMaybe<SortEnumType>;
};

export type GeometryFactoryFilterInput = {
  and?: InputMaybe<Array<GeometryFactoryFilterInput>>;
  coordinateSequenceFactory?: InputMaybe<CoordinateSequenceFactoryFilterInput>;
  geometryServices?: InputMaybe<NtsGeometryServicesFilterInput>;
  or?: InputMaybe<Array<GeometryFactoryFilterInput>>;
  precisionModel?: InputMaybe<PrecisionModelFilterInput>;
  srid?: InputMaybe<IntOperationFilterInput>;
};

export type GeometryFilterInput = {
  and?: InputMaybe<Array<GeometryFilterInput>>;
  area?: InputMaybe<FloatOperationFilterInput>;
  boundary?: InputMaybe<GeometryFilterInput>;
  boundaryDimension?: InputMaybe<DimensionOperationFilterInput>;
  centroid?: InputMaybe<PointFilterInput>;
  coordinate?: InputMaybe<CoordinateFilterInput>;
  coordinates?: InputMaybe<ListFilterInputTypeOfCoordinateFilterInput>;
  dimension?: InputMaybe<DimensionOperationFilterInput>;
  envelope?: InputMaybe<GeometryFilterInput>;
  envelopeInternal?: InputMaybe<EnvelopeFilterInput>;
  factory?: InputMaybe<GeometryFactoryFilterInput>;
  geometryType?: InputMaybe<StringOperationFilterInput>;
  interiorPoint?: InputMaybe<PointFilterInput>;
  isEmpty?: InputMaybe<BooleanOperationFilterInput>;
  isRectangle?: InputMaybe<BooleanOperationFilterInput>;
  isSimple?: InputMaybe<BooleanOperationFilterInput>;
  isValid?: InputMaybe<BooleanOperationFilterInput>;
  length?: InputMaybe<FloatOperationFilterInput>;
  numGeometries?: InputMaybe<IntOperationFilterInput>;
  numPoints?: InputMaybe<IntOperationFilterInput>;
  ogcGeometryType?: InputMaybe<OgcGeometryTypeOperationFilterInput>;
  or?: InputMaybe<Array<GeometryFilterInput>>;
  pointOnSurface?: InputMaybe<PointFilterInput>;
  precisionModel?: InputMaybe<PrecisionModelFilterInput>;
  srid?: InputMaybe<IntOperationFilterInput>;
};

export type GeometryOverlayFilterInput = {
  and?: InputMaybe<Array<GeometryOverlayFilterInput>>;
  or?: InputMaybe<Array<GeometryOverlayFilterInput>>;
};

/** A segment of a collection. */
export type HorseAppointmentByIdCollectionSegment = {
  __typename?: 'HorseAppointmentByIdCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<HorseAppointmentEntity>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

export type HorseAppointmentEntity = {
  __typename?: 'HorseAppointmentEntity';
  endDateTime: Scalars['DateTime']['output'];
  horseAppointmentId: Scalars['Int']['output'];
  horseId: Scalars['String']['output'];
  personSchedule: PersonScheduleEntity;
  personScheduleId: Scalars['Int']['output'];
  rtrReportId?: Maybe<Scalars['Int']['output']>;
  startDateTime: Scalars['DateTime']['output'];
};

export type HorseAppointmentEntityFilterInput = {
  and?: InputMaybe<Array<HorseAppointmentEntityFilterInput>>;
  endDateTime?: InputMaybe<DateTimeOperationFilterInput>;
  horseAppointmentId?: InputMaybe<IntOperationFilterInput>;
  horseId?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<HorseAppointmentEntityFilterInput>>;
  personSchedule?: InputMaybe<PersonScheduleEntityFilterInput>;
  personScheduleId?: InputMaybe<IntOperationFilterInput>;
  rtrReportId?: InputMaybe<IntOperationFilterInput>;
  startDateTime?: InputMaybe<DateTimeOperationFilterInput>;
};

export type HorseAppointmentEntitySortInput = {
  endDateTime?: InputMaybe<SortEnumType>;
  horseAppointmentId?: InputMaybe<SortEnumType>;
  horseId?: InputMaybe<SortEnumType>;
  personSchedule?: InputMaybe<PersonScheduleEntitySortInput>;
  personScheduleId?: InputMaybe<SortEnumType>;
  rtrReportId?: InputMaybe<SortEnumType>;
  startDateTime?: InputMaybe<SortEnumType>;
};

/** A segment of a collection. */
export type HorseAppointmentsByLocationDateRangeCollectionSegment = {
  __typename?: 'HorseAppointmentsByLocationDateRangeCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<HorseAppointmentEntity>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

/** A segment of a collection. */
export type HorseAppointmentsCollectionSegment = {
  __typename?: 'HorseAppointmentsCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<HorseAppointmentEntity>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

export type HorseLocationReport = {
  __typename?: 'HorseLocationReport';
  address?: Maybe<Address>;
  createdAt: Scalars['DateTime']['output'];
  geoLocation?: Maybe<GeoLocation>;
  hisaHorseId: Scalars['String']['output'];
  locationId?: Maybe<Scalars['String']['output']>;
  sourceId: Scalars['String']['output'];
  sourceKind: Scalars['String']['output'];
  timestamp: Scalars['String']['output'];
};

/** A segment of a collection. */
export type HorseLocationReportByIdCollectionSegment = {
  __typename?: 'HorseLocationReportByIdCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<HorseLocationReport>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

/** A segment of a collection. */
export type HorseLocationReportCollectionSegment = {
  __typename?: 'HorseLocationReportCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<HorseLocationReport>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

export type HorseLocationReportFilterInput = {
  address?: InputMaybe<AddressFilterInput>;
  and?: InputMaybe<Array<HorseLocationReportFilterInput>>;
  createdAt?: InputMaybe<DateTimeOperationFilterInput>;
  geoLocation?: InputMaybe<GeoLocationFilterInput>;
  hisaHorseId?: InputMaybe<StringOperationFilterInput>;
  locationId?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<HorseLocationReportFilterInput>>;
  sourceId?: InputMaybe<StringOperationFilterInput>;
  sourceKind?: InputMaybe<StringOperationFilterInput>;
  timestamp?: InputMaybe<StringOperationFilterInput>;
};

export type HorseLocationReportSortInput = {
  address?: InputMaybe<AddressSortInput>;
  createdAt?: InputMaybe<SortEnumType>;
  geoLocation?: InputMaybe<GeoLocationSortInput>;
  hisaHorseId?: InputMaybe<SortEnumType>;
  locationId?: InputMaybe<SortEnumType>;
  sourceId?: InputMaybe<SortEnumType>;
  sourceKind?: InputMaybe<SortEnumType>;
  timestamp?: InputMaybe<SortEnumType>;
};

export enum HorseMedicalRecType {
  Acupuncture = 'ACUPUNCTURE',
  AlternativeTreatments = 'ALTERNATIVE_TREATMENTS',
  Bisphosphonates = 'BISPHOSPHONATES',
  Chiropractic = 'CHIROPRACTIC',
  ClearByRegVet = 'CLEAR_BY_REG_VET',
  Death = 'DEATH',
  DeathReport = 'DEATH_REPORT',
  Dental = 'DENTAL',
  Deworming = 'DEWORMING',
  DispensedMeds = 'DISPENSED_MEDS',
  DrugAdministered = 'DRUG_ADMINISTERED',
  Endoscopy = 'ENDOSCOPY',
  Exam = 'EXAM',
  Followup = 'FOLLOWUP',
  Imaging = 'IMAGING',
  Inspection = 'INSPECTION',
  IntraarticularInjection = 'INTRAARTICULAR_INJECTION',
  IntralesionalInjection = 'INTRALESIONAL_INJECTION',
  MandatoryPreRaceAndPreWorkVetInspection = 'MANDATORY_PRE_RACE_AND_PRE_WORK_VET_INSPECTION',
  Necropsy = 'NECROPSY',
  Other = 'OTHER',
  Physiotherapy = 'PHYSIOTHERAPY',
  Procedure = 'PROCEDURE',
  RaceInspection = 'RACE_INSPECTION',
  Retired = 'RETIRED',
  Shockwave = 'SHOCKWAVE',
  Surgery = 'SURGERY',
  Test = 'TEST',
  Treatment = 'TREATMENT',
  Vaccine = 'VACCINE',
  VetInspection = 'VET_INSPECTION'
}

export enum HorseMedicalRouteAdmin {
  Cream = 'CREAM',
  Ia = 'IA',
  Im = 'IM',
  Inhalation = 'INHALATION',
  Intralesional = 'INTRALESIONAL',
  Intranasal = 'INTRANASAL',
  Iv = 'IV',
  Ng = 'NG',
  Ophthalmic = 'OPHTHALMIC',
  Oral = 'ORAL',
  Other = 'OTHER',
  Po = 'PO',
  SubQ = 'SUB_Q',
  Topical = 'TOPICAL',
  Transdermal = 'TRANSDERMAL',
  Unknown = 'UNKNOWN',
  Unspecified = 'UNSPECIFIED'
}

export type HorseMedicalRouteAdminOperationFilterInput = {
  eq?: InputMaybe<HorseMedicalRouteAdmin>;
  in?: InputMaybe<Array<HorseMedicalRouteAdmin>>;
  neq?: InputMaybe<HorseMedicalRouteAdmin>;
  nin?: InputMaybe<Array<HorseMedicalRouteAdmin>>;
};

export type HorseTreatment = {
  __typename?: 'HorseTreatment';
  activity: RecordActivity;
  aiProcessing: Array<AiProcessing>;
  datagramPath: Scalars['String']['output'];
  hisaId: Scalars['String']['output'];
  horseId: Scalars['String']['output'];
  horseMedicalId: Scalars['String']['output'];
  isDeleted: Scalars['Boolean']['output'];
  people: TreatmentRecordPeople;
  rawPayloadPath: Scalars['String']['output'];
  recType: HorseTreatmentType;
  sk: Scalars['String']['output'];
  treatmentDate: Scalars['Date']['output'];
  treatmentRecordId: Scalars['String']['output'];
  uuid: Scalars['String']['output'];
};

/** A segment of a collection. */
export type HorseTreatmentByIdCollectionSegment = {
  __typename?: 'HorseTreatmentByIdCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<HorseTreatment>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

/** A segment of a collection. */
export type HorseTreatmentCollectionSegment = {
  __typename?: 'HorseTreatmentCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<HorseTreatment>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

export type HorseTreatmentFilterInput = {
  activity?: InputMaybe<RecordActivityFilterInput>;
  aiProcessing?: InputMaybe<ListFilterInputTypeOfAiProcessingFilterInput>;
  and?: InputMaybe<Array<HorseTreatmentFilterInput>>;
  datagramPath?: InputMaybe<StringOperationFilterInput>;
  hisaId?: InputMaybe<StringOperationFilterInput>;
  horseId?: InputMaybe<StringOperationFilterInput>;
  horseMedicalId?: InputMaybe<StringOperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  or?: InputMaybe<Array<HorseTreatmentFilterInput>>;
  people?: InputMaybe<TreatmentRecordPeopleFilterInput>;
  rawPayloadPath?: InputMaybe<StringOperationFilterInput>;
  recType?: InputMaybe<HorseTreatmentTypeOperationFilterInput>;
  sk?: InputMaybe<StringOperationFilterInput>;
  treatmentDate?: InputMaybe<DateOperationFilterInput>;
  treatmentRecordId?: InputMaybe<StringOperationFilterInput>;
  uuid?: InputMaybe<StringOperationFilterInput>;
};

export type HorseTreatmentSortInput = {
  activity?: InputMaybe<RecordActivitySortInput>;
  datagramPath?: InputMaybe<SortEnumType>;
  hisaId?: InputMaybe<SortEnumType>;
  horseId?: InputMaybe<SortEnumType>;
  horseMedicalId?: InputMaybe<SortEnumType>;
  isDeleted?: InputMaybe<SortEnumType>;
  people?: InputMaybe<TreatmentRecordPeopleSortInput>;
  rawPayloadPath?: InputMaybe<SortEnumType>;
  recType?: InputMaybe<SortEnumType>;
  sk?: InputMaybe<SortEnumType>;
  treatmentDate?: InputMaybe<SortEnumType>;
  treatmentRecordId?: InputMaybe<SortEnumType>;
  uuid?: InputMaybe<SortEnumType>;
};

export enum HorseTreatmentType {
  Acupuncture = 'ACUPUNCTURE',
  AlternativeTherapies = 'ALTERNATIVE_THERAPIES',
  BloodDraw = 'BLOOD_DRAW',
  Cardiac = 'CARDIAC',
  Chiropractic = 'CHIROPRACTIC',
  ClearbyRegVet = 'CLEARBY_REG_VET',
  Colic = 'COLIC',
  Death = 'DEATH',
  DentalCare = 'DENTAL_CARE',
  Deworming = 'DEWORMING',
  DiagnosticImaging = 'DIAGNOSTIC_IMAGING',
  DiagnosticTests = 'DIAGNOSTIC_TESTS',
  DrugAdministered = 'DRUG_ADMINISTERED',
  DrugDispensed = 'DRUG_DISPENSED',
  Endoscopy = 'ENDOSCOPY',
  Exam = 'EXAM',
  FluidAndElectrolyteTherapy = 'FLUID_AND_ELECTROLYTE_THERAPY',
  HealthCertificate = 'HEALTH_CERTIFICATE',
  HoofCare = 'HOOF_CARE',
  Injury = 'INJURY',
  IntralesionalInjection = 'INTRALESIONAL_INJECTION',
  IntraArticularInjection = 'INTRA_ARTICULAR_INJECTION',
  LamenessExam = 'LAMENESS_EXAM',
  Lasix = 'LASIX',
  MandatoryAttendingVetInspection = 'MANDATORY_ATTENDING_VET_INSPECTION',
  Necropsy = 'NECROPSY',
  Other = 'OTHER',
  Procedure = 'PROCEDURE',
  Retirement = 'RETIREMENT',
  Shockwave = 'SHOCKWAVE',
  Surgery = 'SURGERY',
  Unknown = 'UNKNOWN',
  Vaccines = 'VACCINES'
}

export type HorseTreatmentTypeOperationFilterInput = {
  eq?: InputMaybe<HorseTreatmentType>;
  in?: InputMaybe<Array<HorseTreatmentType>>;
  neq?: InputMaybe<HorseTreatmentType>;
  nin?: InputMaybe<Array<HorseTreatmentType>>;
};

export type HorseVetClearanceInfoResponse = {
  __typename?: 'HorseVetClearanceInfoResponse';
  clearedOn: Scalars['Date']['output'];
  clearedUntil: Scalars['Date']['output'];
  type: HorseVetClearanceType;
};

export enum HorseVetClearanceType {
  HorseMedical = 'HORSE_MEDICAL',
  PostLayoffReport = 'POST_LAYOFF_REPORT',
  WorkOff = 'WORK_OFF'
}

export type HorseVetListInfoResponse = {
  __typename?: 'HorseVetListInfoResponse';
  datePlaceOnList: Scalars['Date']['output'];
  dateToComeOff?: Maybe<Scalars['Date']['output']>;
  eligibleToWork?: Maybe<Scalars['Date']['output']>;
  isRegVetClearRequired: Scalars['Boolean']['output'];
  reason?: Maybe<VetsListReason>;
  releaseDate?: Maybe<Scalars['Date']['output']>;
  restrictWorks: Scalars['Boolean']['output'];
};

export type IntOperationFilterInput = {
  eq?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  neq?: InputMaybe<Scalars['Int']['input']>;
  ngt?: InputMaybe<Scalars['Int']['input']>;
  ngte?: InputMaybe<Scalars['Int']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  nlt?: InputMaybe<Scalars['Int']['input']>;
  nlte?: InputMaybe<Scalars['Int']['input']>;
};

export type ListFilterInputTypeOfAiProcessingFilterInput = {
  all?: InputMaybe<AiProcessingFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<AiProcessingFilterInput>;
  some?: InputMaybe<AiProcessingFilterInput>;
};

export type ListFilterInputTypeOfCoordinateFilterInput = {
  all?: InputMaybe<CoordinateFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<CoordinateFilterInput>;
  some?: InputMaybe<CoordinateFilterInput>;
};

export type ListFilterInputTypeOfDiscussionMemberEntityFilterInput = {
  all?: InputMaybe<DiscussionMemberEntityFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<DiscussionMemberEntityFilterInput>;
  some?: InputMaybe<DiscussionMemberEntityFilterInput>;
};

export type ListFilterInputTypeOfDiscussionMessageAttachmentEntityFilterInput = {
  all?: InputMaybe<DiscussionMessageAttachmentEntityFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<DiscussionMessageAttachmentEntityFilterInput>;
  some?: InputMaybe<DiscussionMessageAttachmentEntityFilterInput>;
};

export type ListFilterInputTypeOfDiscussionMessageEntityFilterInput = {
  all?: InputMaybe<DiscussionMessageEntityFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<DiscussionMessageEntityFilterInput>;
  some?: InputMaybe<DiscussionMessageEntityFilterInput>;
};

export type ListFilterInputTypeOfHorseAppointmentEntityFilterInput = {
  all?: InputMaybe<HorseAppointmentEntityFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<HorseAppointmentEntityFilterInput>;
  some?: InputMaybe<HorseAppointmentEntityFilterInput>;
};

export type ListFilterInputTypeOfLocationAddressEntityFilterInput = {
  all?: InputMaybe<LocationAddressEntityFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<LocationAddressEntityFilterInput>;
  some?: InputMaybe<LocationAddressEntityFilterInput>;
};

export type ListFilterInputTypeOfLocationAppointmentEntityFilterInput = {
  all?: InputMaybe<LocationAppointmentEntityFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<LocationAppointmentEntityFilterInput>;
  some?: InputMaybe<LocationAppointmentEntityFilterInput>;
};

export type ListFilterInputTypeOfLocationContactsEntityFilterInput = {
  all?: InputMaybe<LocationContactsEntityFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<LocationContactsEntityFilterInput>;
  some?: InputMaybe<LocationContactsEntityFilterInput>;
};

export type ListFilterInputTypeOfLocationScheduleDetailEntityFilterInput = {
  all?: InputMaybe<LocationScheduleDetailEntityFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<LocationScheduleDetailEntityFilterInput>;
  some?: InputMaybe<LocationScheduleDetailEntityFilterInput>;
};

export type ListFilterInputTypeOfLocationScheduleEntityFilterInput = {
  all?: InputMaybe<LocationScheduleEntityFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<LocationScheduleEntityFilterInput>;
  some?: InputMaybe<LocationScheduleEntityFilterInput>;
};

export type ListFilterInputTypeOfLocationScheduleExceptionEntityFilterInput = {
  all?: InputMaybe<LocationScheduleExceptionEntityFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<LocationScheduleExceptionEntityFilterInput>;
  some?: InputMaybe<LocationScheduleExceptionEntityFilterInput>;
};

export type ListFilterInputTypeOfLocationSlotEntityFilterInput = {
  all?: InputMaybe<LocationSlotEntityFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<LocationSlotEntityFilterInput>;
  some?: InputMaybe<LocationSlotEntityFilterInput>;
};

export type ListFilterInputTypeOfPersonScheduleEntityFilterInput = {
  all?: InputMaybe<PersonScheduleEntityFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<PersonScheduleEntityFilterInput>;
  some?: InputMaybe<PersonScheduleEntityFilterInput>;
};

export type ListFilterInputTypeOfPostLayoffReportInjuryFilterInput = {
  all?: InputMaybe<PostLayoffReportInjuryFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<PostLayoffReportInjuryFilterInput>;
  some?: InputMaybe<PostLayoffReportInjuryFilterInput>;
};

export type ListFilterInputTypeOfPostLayoffReportMedicalRecordFilterInput = {
  all?: InputMaybe<PostLayoffReportMedicalRecordFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<PostLayoffReportMedicalRecordFilterInput>;
  some?: InputMaybe<PostLayoffReportMedicalRecordFilterInput>;
};

export type ListFilterInputTypeOfPostLayoffReportProcedureFilterInput = {
  all?: InputMaybe<PostLayoffReportProcedureFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<PostLayoffReportProcedureFilterInput>;
  some?: InputMaybe<PostLayoffReportProcedureFilterInput>;
};

export type ListFilterInputTypeOfPostLayoffReportRaceEntryFilterInput = {
  all?: InputMaybe<PostLayoffReportRaceEntryFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<PostLayoffReportRaceEntryFilterInput>;
  some?: InputMaybe<PostLayoffReportRaceEntryFilterInput>;
};

export type ListFilterInputTypeOfPostLayoffReportTreatmentFilterInput = {
  all?: InputMaybe<PostLayoffReportTreatmentFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<PostLayoffReportTreatmentFilterInput>;
  some?: InputMaybe<PostLayoffReportTreatmentFilterInput>;
};

export type ListFilterInputTypeOfPostLayoffReportVetListFilterInput = {
  all?: InputMaybe<PostLayoffReportVetListFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<PostLayoffReportVetListFilterInput>;
  some?: InputMaybe<PostLayoffReportVetListFilterInput>;
};

export type ListFilterInputTypeOfReadyToRunRaceEntryFilterInput = {
  all?: InputMaybe<ReadyToRunRaceEntryFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<ReadyToRunRaceEntryFilterInput>;
  some?: InputMaybe<ReadyToRunRaceEntryFilterInput>;
};

export type ListFilterInputTypeOfReadyToRunReportDiscussionFilterInput = {
  all?: InputMaybe<ReadyToRunReportDiscussionFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<ReadyToRunReportDiscussionFilterInput>;
  some?: InputMaybe<ReadyToRunReportDiscussionFilterInput>;
};

export type ListFilterInputTypeOfReadyToRunStatusReasonFilterInput = {
  all?: InputMaybe<ReadyToRunStatusReasonFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<ReadyToRunStatusReasonFilterInput>;
  some?: InputMaybe<ReadyToRunStatusReasonFilterInput>;
};

export type ListFilterInputTypeOfReadyToRunWorkOffReasonFilterInput = {
  all?: InputMaybe<ReadyToRunWorkOffReasonFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<ReadyToRunWorkOffReasonFilterInput>;
  some?: InputMaybe<ReadyToRunWorkOffReasonFilterInput>;
};

export type ListFilterInputTypeOfRtrReportMedicalSummaryFilterInput = {
  all?: InputMaybe<RtrReportMedicalSummaryFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<RtrReportMedicalSummaryFilterInput>;
  some?: InputMaybe<RtrReportMedicalSummaryFilterInput>;
};

export type ListFilterInputTypeOfTransportationEventAddressEntityFilterInput = {
  all?: InputMaybe<TransportationEventAddressEntityFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<TransportationEventAddressEntityFilterInput>;
  some?: InputMaybe<TransportationEventAddressEntityFilterInput>;
};

export type ListFilterInputTypeOfTransportationEventHorseEntityFilterInput = {
  all?: InputMaybe<TransportationEventHorseEntityFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<TransportationEventHorseEntityFilterInput>;
  some?: InputMaybe<TransportationEventHorseEntityFilterInput>;
};

export type ListFilterInputTypeOfTreatmentTemplateFilterInput = {
  all?: InputMaybe<TreatmentTemplateFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<TreatmentTemplateFilterInput>;
  some?: InputMaybe<TreatmentTemplateFilterInput>;
};

export type ListStringOperationFilterInput = {
  all?: InputMaybe<StringOperationFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<StringOperationFilterInput>;
  some?: InputMaybe<StringOperationFilterInput>;
};

export type LocationAccreditationModel = {
  __typename?: 'LocationAccreditationModel';
  expires?: Maybe<Scalars['DateTime']['output']>;
  status: LocationAccreditationStatus;
};

export enum LocationAccreditationStatus {
  Denied = 'DENIED',
  Full = 'FULL',
  Provisional = 'PROVISIONAL',
  Revoked = 'REVOKED',
  Suspended = 'SUSPENDED'
}

export type LocationAddressEntity = {
  __typename?: 'LocationAddressEntity';
  city?: Maybe<Scalars['String']['output']>;
  country?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  locationAddressId: Scalars['Int']['output'];
  locationId: Scalars['String']['output'];
  state?: Maybe<Scalars['String']['output']>;
  street?: Maybe<Scalars['String']['output']>;
  unitAptBoxNumber?: Maybe<Scalars['String']['output']>;
  zipPostalCode?: Maybe<Scalars['String']['output']>;
};

export type LocationAddressEntityFilterInput = {
  and?: InputMaybe<Array<LocationAddressEntityFilterInput>>;
  city?: InputMaybe<StringOperationFilterInput>;
  country?: InputMaybe<StringOperationFilterInput>;
  createdAt?: InputMaybe<DateTimeOperationFilterInput>;
  locationAddressId?: InputMaybe<IntOperationFilterInput>;
  locationId?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<LocationAddressEntityFilterInput>>;
  state?: InputMaybe<StringOperationFilterInput>;
  street?: InputMaybe<StringOperationFilterInput>;
  unitAptBoxNumber?: InputMaybe<StringOperationFilterInput>;
  zipPostalCode?: InputMaybe<StringOperationFilterInput>;
};

/** A segment of a collection. */
export type LocationAppointmentByIdCollectionSegment = {
  __typename?: 'LocationAppointmentByIdCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<LocationAppointmentEntity>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

/** A segment of a collection. */
export type LocationAppointmentCollectionSegment = {
  __typename?: 'LocationAppointmentCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<LocationAppointmentEntity>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

export type LocationAppointmentEntity = {
  __typename?: 'LocationAppointmentEntity';
  createdAt: Scalars['DateTime']['output'];
  date: Scalars['Date']['output'];
  endTime: Scalars['TimeSpan']['output'];
  locationAppointmentId: Scalars['Int']['output'];
  locationId: Scalars['String']['output'];
  locationScheduleType: LocationScheduleType;
  locationSlotId?: Maybe<Scalars['Int']['output']>;
  name: Scalars['String']['output'];
  personSchedules: Array<PersonScheduleEntity>;
  startTime: Scalars['TimeSpan']['output'];
};

export type LocationAppointmentEntityFilterInput = {
  and?: InputMaybe<Array<LocationAppointmentEntityFilterInput>>;
  createdAt?: InputMaybe<DateTimeOperationFilterInput>;
  date?: InputMaybe<DateOperationFilterInput>;
  endTime?: InputMaybe<TimeSpanOperationFilterInput>;
  locationAppointmentId?: InputMaybe<IntOperationFilterInput>;
  locationId?: InputMaybe<StringOperationFilterInput>;
  locationScheduleType?: InputMaybe<LocationScheduleTypeOperationFilterInput>;
  locationSlotId?: InputMaybe<IntOperationFilterInput>;
  name?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<LocationAppointmentEntityFilterInput>>;
  personSchedules?: InputMaybe<ListFilterInputTypeOfPersonScheduleEntityFilterInput>;
  startTime?: InputMaybe<TimeSpanOperationFilterInput>;
};

export type LocationAppointmentEntitySortInput = {
  createdAt?: InputMaybe<SortEnumType>;
  date?: InputMaybe<SortEnumType>;
  endTime?: InputMaybe<SortEnumType>;
  locationAppointmentId?: InputMaybe<SortEnumType>;
  locationId?: InputMaybe<SortEnumType>;
  locationScheduleType?: InputMaybe<SortEnumType>;
  locationSlotId?: InputMaybe<SortEnumType>;
  name?: InputMaybe<SortEnumType>;
  startTime?: InputMaybe<SortEnumType>;
};

/** A segment of a collection. */
export type LocationByIdCollectionSegment = {
  __typename?: 'LocationByIdCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<BasicLocationEntity>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

export enum LocationContactType {
  Bookkeeper = 'BOOKKEEPER',
  ChiefSteward = 'CHIEF_STEWARD',
  ClaimsClerk = 'CLAIMS_CLERK',
  DirectorOfRacing = 'DIRECTOR_OF_RACING',
  GeneralManager = 'GENERAL_MANAGER',
  HeadParamedic = 'HEAD_PARAMEDIC',
  HisaAdmin = 'HISA_ADMIN',
  HorseshoeInspector = 'HORSESHOE_INSPECTOR',
  MedicalDirector = 'MEDICAL_DIRECTOR',
  RacingSecretary = 'RACING_SECRETARY',
  RegulatoryVeterinarians = 'REGULATORY_VETERINARIANS',
  SafetyDirector = 'SAFETY_DIRECTOR',
  SafetyOfficer = 'SAFETY_OFFICER',
  StallSuperintendent = 'STALL_SUPERINTENDENT',
  Stewards = 'STEWARDS',
  TrackSuperintendent = 'TRACK_SUPERINTENDENT'
}

export type LocationContactTypeOperationFilterInput = {
  eq?: InputMaybe<LocationContactType>;
  in?: InputMaybe<Array<LocationContactType>>;
  neq?: InputMaybe<LocationContactType>;
  nin?: InputMaybe<Array<LocationContactType>>;
};

export type LocationContactsEntity = {
  __typename?: 'LocationContactsEntity';
  createdAt: Scalars['DateTime']['output'];
  email?: Maybe<Scalars['String']['output']>;
  locationContactId: Scalars['Int']['output'];
  locationId: Scalars['String']['output'];
  mobileNumber?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  notes?: Maybe<Scalars['String']['output']>;
  type: LocationContactType;
};

export type LocationContactsEntityFilterInput = {
  and?: InputMaybe<Array<LocationContactsEntityFilterInput>>;
  createdAt?: InputMaybe<DateTimeOperationFilterInput>;
  email?: InputMaybe<StringOperationFilterInput>;
  locationContactId?: InputMaybe<IntOperationFilterInput>;
  locationId?: InputMaybe<StringOperationFilterInput>;
  mobileNumber?: InputMaybe<StringOperationFilterInput>;
  name?: InputMaybe<StringOperationFilterInput>;
  notes?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<LocationContactsEntityFilterInput>>;
  type?: InputMaybe<LocationContactTypeOperationFilterInput>;
};

export type LocationDistributionLists = {
  __typename?: 'LocationDistributionLists';
  afterCareCreated: Array<Scalars['String']['output']>;
  appAccess: Array<Scalars['String']['output']>;
  canceledClaim: Array<Scalars['String']['output']>;
  catastrophicInjury: Array<Scalars['String']['output']>;
  disqualified: Array<Scalars['String']['output']>;
  enforcementTeam: Array<Scalars['String']['output']>;
  executive: Array<Scalars['String']['output']>;
  hisaBackOffice: Array<Scalars['String']['output']>;
  horsesAtRisk: Array<Scalars['String']['output']>;
  iaChanged?: Maybe<Array<Scalars['String']['output']>>;
  isDisplayed: Scalars['Boolean']['output'];
  rscCommittee: Array<Scalars['String']['output']>;
  violations: Array<Scalars['String']['output']>;
  workoutViolations: Array<Scalars['String']['output']>;
};

export enum LocationHisaAgreementStatus {
  ImpLetter = 'IMP_LETTER',
  InProcess = 'IN_PROCESS',
  None = 'NONE',
  Via = 'VIA'
}

export type LocationMeetAtTrackModel = {
  __typename?: 'LocationMeetAtTrackModel';
  additionalDates: Array<Scalars['Date']['output']>;
  excludedDates: Array<Scalars['Date']['output']>;
  raceDaysOfWeek: Array<DayOfWeek>;
  startDate: Scalars['DateTime']['output'];
  stopDate: Scalars['DateTime']['output'];
};

export type LocationPersonDateRangeModel = {
  __typename?: 'LocationPersonDateRangeModel';
  endDate?: Maybe<Scalars['Date']['output']>;
  hisaPersonId: Scalars['String']['output'];
  startDate?: Maybe<Scalars['Date']['output']>;
};

export type LocationResponse = {
  __typename?: 'LocationResponse';
  accreditation: LocationAccreditationModel;
  address: Address;
  admin: Array<Scalars['String']['output']>;
  associationVets: Array<LocationPersonDateRangeModel>;
  claimingClerk: Array<Scalars['String']['output']>;
  defaultDesignatedOwner?: Maybe<Scalars['String']['output']>;
  defaultResponsiblePerson?: Maybe<Scalars['String']['output']>;
  defaultVet?: Maybe<Scalars['String']['output']>;
  distributionLists: LocationDistributionLists;
  email?: Maybe<Scalars['String']['output']>;
  hisaAdmin?: Maybe<Scalars['String']['output']>;
  hisaRegulated: Scalars['Boolean']['output'];
  hisaRepresentative?: Maybe<Scalars['String']['output']>;
  hisaStateAgreementStatus: LocationHisaAgreementStatus;
  horseshoeInspectors: Array<LocationPersonDateRangeModel>;
  ignoreForAutocomplete: Scalars['Boolean']['output'];
  isLocked: Scalars['Boolean']['output'];
  latLng?: Maybe<GeoLocation>;
  locationId: Scalars['String']['output'];
  management: Array<Scalars['String']['output']>;
  meetAtTrack: Array<LocationMeetAtTrackModel>;
  name?: Maybe<Scalars['String']['output']>;
  ownerIds: Array<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  regulatoryVets: Array<LocationPersonDateRangeModel>;
  rswc: LocationRswc;
  srcLocationId?: Maybe<Scalars['String']['output']>;
  srcTracks: Array<Scalars['String']['output']>;
  staff: Array<Scalars['String']['output']>;
  stewards: Array<LocationPersonDateRangeModel>;
  trackAgreementSignDate?: Maybe<Scalars['Date']['output']>;
  trackAgreementSigned: Scalars['Boolean']['output'];
  trackCode: Array<Scalars['String']['output']>;
  trackStallSuperintendent: Array<LocationPersonDateRangeModel>;
  type: LocationType;
  vetIds: Array<Scalars['String']['output']>;
  webSite?: Maybe<Scalars['String']['output']>;
};

export type LocationRswc = {
  __typename?: 'LocationRswc';
  associationVet?: Maybe<Array<Scalars['String']['output']>>;
  horsemanRep?: Maybe<Array<Scalars['String']['output']>>;
  horseshoeInspector?: Maybe<Array<Scalars['String']['output']>>;
  jockeyRep?: Maybe<Array<Scalars['String']['output']>>;
  medicalDirector?: Maybe<Array<Scalars['String']['output']>>;
  racingSecretary?: Maybe<Array<Scalars['String']['output']>>;
  regulatoryVet?: Maybe<Array<Scalars['String']['output']>>;
  safetyDirector?: Maybe<Array<Scalars['String']['output']>>;
  safetyOfficer?: Maybe<Array<Scalars['String']['output']>>;
  trackStuff: Array<Scalars['String']['output']>;
  trackSuper?: Maybe<Array<Scalars['String']['output']>>;
  trainerRep?: Maybe<Array<Scalars['String']['output']>>;
};

export type LocationScheduleDetailEntity = {
  __typename?: 'LocationScheduleDetailEntity';
  createdAt: Scalars['DateTime']['output'];
  dayOfWeek: DayOfWeek;
  isActive: Scalars['Boolean']['output'];
  locationSchedule: LocationScheduleEntity;
  locationScheduleDetailId: Scalars['Int']['output'];
  locationScheduleId: Scalars['Int']['output'];
  slots: Array<LocationSlotEntity>;
};

export type LocationScheduleDetailEntityFilterInput = {
  and?: InputMaybe<Array<LocationScheduleDetailEntityFilterInput>>;
  createdAt?: InputMaybe<DateTimeOperationFilterInput>;
  dayOfWeek?: InputMaybe<DayOfWeekOperationFilterInput>;
  isActive?: InputMaybe<BooleanOperationFilterInput>;
  locationSchedule?: InputMaybe<LocationScheduleEntityFilterInput>;
  locationScheduleDetailId?: InputMaybe<IntOperationFilterInput>;
  locationScheduleId?: InputMaybe<IntOperationFilterInput>;
  or?: InputMaybe<Array<LocationScheduleDetailEntityFilterInput>>;
  slots?: InputMaybe<ListFilterInputTypeOfLocationSlotEntityFilterInput>;
};

export type LocationScheduleEntity = {
  __typename?: 'LocationScheduleEntity';
  createdAt: Scalars['DateTime']['output'];
  days: Array<LocationScheduleDetailEntity>;
  endDate?: Maybe<Scalars['Date']['output']>;
  locationId: Scalars['String']['output'];
  locationScheduleId: Scalars['Int']['output'];
  startDate?: Maybe<Scalars['Date']['output']>;
  type: LocationScheduleType;
};

export type LocationScheduleEntityFilterInput = {
  and?: InputMaybe<Array<LocationScheduleEntityFilterInput>>;
  createdAt?: InputMaybe<DateTimeOperationFilterInput>;
  days?: InputMaybe<ListFilterInputTypeOfLocationScheduleDetailEntityFilterInput>;
  endDate?: InputMaybe<DateOperationFilterInput>;
  locationId?: InputMaybe<StringOperationFilterInput>;
  locationScheduleId?: InputMaybe<IntOperationFilterInput>;
  or?: InputMaybe<Array<LocationScheduleEntityFilterInput>>;
  startDate?: InputMaybe<DateOperationFilterInput>;
  type?: InputMaybe<LocationScheduleTypeOperationFilterInput>;
};

export type LocationScheduleExceptionEntity = {
  __typename?: 'LocationScheduleExceptionEntity';
  createdAt: Scalars['DateTime']['output'];
  date: Scalars['Date']['output'];
  isActive: Scalars['Boolean']['output'];
  locationId: Scalars['String']['output'];
  locationScheduleExceptionId: Scalars['Int']['output'];
  slots: Array<LocationSlotEntity>;
  type: LocationScheduleType;
};

export type LocationScheduleExceptionEntityFilterInput = {
  and?: InputMaybe<Array<LocationScheduleExceptionEntityFilterInput>>;
  createdAt?: InputMaybe<DateTimeOperationFilterInput>;
  date?: InputMaybe<DateOperationFilterInput>;
  isActive?: InputMaybe<BooleanOperationFilterInput>;
  locationId?: InputMaybe<StringOperationFilterInput>;
  locationScheduleExceptionId?: InputMaybe<IntOperationFilterInput>;
  or?: InputMaybe<Array<LocationScheduleExceptionEntityFilterInput>>;
  slots?: InputMaybe<ListFilterInputTypeOfLocationSlotEntityFilterInput>;
  type?: InputMaybe<LocationScheduleTypeOperationFilterInput>;
};

export enum LocationScheduleType {
  Meet = 'MEET',
  Work = 'WORK'
}

export type LocationScheduleTypeOperationFilterInput = {
  eq?: InputMaybe<LocationScheduleType>;
  in?: InputMaybe<Array<LocationScheduleType>>;
  neq?: InputMaybe<LocationScheduleType>;
  nin?: InputMaybe<Array<LocationScheduleType>>;
};

export type LocationSlotEntity = {
  __typename?: 'LocationSlotEntity';
  assignes: Array<LocationAppointmentEntity>;
  capacity: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  endTime: Scalars['TimeSpan']['output'];
  locationScheduleDetail?: Maybe<LocationScheduleDetailEntity>;
  locationScheduleDetailId?: Maybe<Scalars['Int']['output']>;
  locationScheduleException?: Maybe<LocationScheduleExceptionEntity>;
  locationScheduleExceptionId?: Maybe<Scalars['Int']['output']>;
  locationSlotId: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  startTime: Scalars['TimeSpan']['output'];
};

export type LocationSlotEntityFilterInput = {
  and?: InputMaybe<Array<LocationSlotEntityFilterInput>>;
  assignes?: InputMaybe<ListFilterInputTypeOfLocationAppointmentEntityFilterInput>;
  capacity?: InputMaybe<IntOperationFilterInput>;
  createdAt?: InputMaybe<DateTimeOperationFilterInput>;
  endTime?: InputMaybe<TimeSpanOperationFilterInput>;
  locationScheduleDetail?: InputMaybe<LocationScheduleDetailEntityFilterInput>;
  locationScheduleDetailId?: InputMaybe<IntOperationFilterInput>;
  locationScheduleException?: InputMaybe<LocationScheduleExceptionEntityFilterInput>;
  locationScheduleExceptionId?: InputMaybe<IntOperationFilterInput>;
  locationSlotId?: InputMaybe<IntOperationFilterInput>;
  name?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<LocationSlotEntityFilterInput>>;
  startTime?: InputMaybe<TimeSpanOperationFilterInput>;
};

export enum LocationType {
  AfterCare = 'AFTER_CARE',
  AuctionHouse = 'AUCTION_HOUSE',
  DiagnosticLab = 'DIAGNOSTIC_LAB',
  Farm = 'FARM',
  Hisa = 'HISA',
  Hiwu = 'HIWU',
  IndustryGroup = 'INDUSTRY_GROUP',
  /** @deprecated Use TestingLab. Lab will be removed in future. */
  Lab = 'LAB',
  Miscellaneous = 'MISCELLANEOUS',
  /** @deprecated Use Miscellaneous. Other will be removed in future. */
  Other = 'OTHER',
  OwnershipEntity = 'OWNERSHIP_ENTITY',
  /** @deprecated Use OwnershipEntity. OwnershipLLC will be removed in future. */
  OwnershipLlc = 'OWNERSHIP_LLC',
  Racetrack = 'RACETRACK',
  RacingStable = 'RACING_STABLE',
  State = 'STATE',
  StateRacingCommission = 'STATE_RACING_COMMISSION',
  TestingLab = 'TESTING_LAB',
  TrainingCenter = 'TRAINING_CENTER',
  TrainingTrack = 'TRAINING_TRACK',
  Transport = 'TRANSPORT',
  VetHospital = 'VET_HOSPITAL',
  VetPractice = 'VET_PRACTICE'
}

/** A segment of a collection. */
export type LocationsCollectionSegment = {
  __typename?: 'LocationsCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<BasicLocationEntity>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

export type LongOperationFilterInput = {
  eq?: InputMaybe<Scalars['Long']['input']>;
  gt?: InputMaybe<Scalars['Long']['input']>;
  gte?: InputMaybe<Scalars['Long']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Long']['input']>>>;
  lt?: InputMaybe<Scalars['Long']['input']>;
  lte?: InputMaybe<Scalars['Long']['input']>;
  neq?: InputMaybe<Scalars['Long']['input']>;
  ngt?: InputMaybe<Scalars['Long']['input']>;
  ngte?: InputMaybe<Scalars['Long']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['Long']['input']>>>;
  nlt?: InputMaybe<Scalars['Long']['input']>;
  nlte?: InputMaybe<Scalars['Long']['input']>;
};

export type MedicalSummaryEntity = {
  __typename?: 'MedicalSummaryEntity';
  createdAt: Scalars['DateTime']['output'];
  fileName: Scalars['String']['output'];
  horseId: Scalars['String']['output'];
  medicalSummaryId: Scalars['Int']['output'];
  periodEnd: Scalars['Date']['output'];
  periodStart: Scalars['Date']['output'];
  status: MedicalSummaryStatus;
  summary?: Maybe<Scalars['String']['output']>;
  summaryType: MedicalSummaryType;
};

export type MedicalSummaryEntityFilterInput = {
  and?: InputMaybe<Array<MedicalSummaryEntityFilterInput>>;
  createdAt?: InputMaybe<DateTimeOperationFilterInput>;
  fileName?: InputMaybe<StringOperationFilterInput>;
  horseId?: InputMaybe<StringOperationFilterInput>;
  medicalSummaryId?: InputMaybe<IntOperationFilterInput>;
  or?: InputMaybe<Array<MedicalSummaryEntityFilterInput>>;
  periodEnd?: InputMaybe<DateOperationFilterInput>;
  periodStart?: InputMaybe<DateOperationFilterInput>;
  status?: InputMaybe<MedicalSummaryStatusOperationFilterInput>;
  summary?: InputMaybe<StringOperationFilterInput>;
  summaryType?: InputMaybe<MedicalSummaryTypeOperationFilterInput>;
};

export enum MedicalSummaryStatus {
  Complete = 'COMPLETE',
  Queued = 'QUEUED'
}

export type MedicalSummaryStatusOperationFilterInput = {
  eq?: InputMaybe<MedicalSummaryStatus>;
  in?: InputMaybe<Array<MedicalSummaryStatus>>;
  neq?: InputMaybe<MedicalSummaryStatus>;
  nin?: InputMaybe<Array<MedicalSummaryStatus>>;
};

export enum MedicalSummaryType {
  Report = 'REPORT'
}

export type MedicalSummaryTypeOperationFilterInput = {
  eq?: InputMaybe<MedicalSummaryType>;
  in?: InputMaybe<Array<MedicalSummaryType>>;
  neq?: InputMaybe<MedicalSummaryType>;
  nin?: InputMaybe<Array<MedicalSummaryType>>;
};

export type NtsGeometryServicesFilterInput = {
  and?: InputMaybe<Array<NtsGeometryServicesFilterInput>>;
  coordinateEqualityComparer?: InputMaybe<CoordinateEqualityComparerFilterInput>;
  defaultCoordinateSequenceFactory?: InputMaybe<CoordinateSequenceFactoryFilterInput>;
  defaultPrecisionModel?: InputMaybe<PrecisionModelFilterInput>;
  defaultSRID?: InputMaybe<IntOperationFilterInput>;
  geometryOverlay?: InputMaybe<GeometryOverlayFilterInput>;
  or?: InputMaybe<Array<NtsGeometryServicesFilterInput>>;
};

export type NullableOfHorseMedicalRecTypeOperationFilterInput = {
  eq?: InputMaybe<HorseMedicalRecType>;
  in?: InputMaybe<Array<InputMaybe<HorseMedicalRecType>>>;
  neq?: InputMaybe<HorseMedicalRecType>;
  nin?: InputMaybe<Array<InputMaybe<HorseMedicalRecType>>>;
};

export type NullableOfRelocationReasonOperationFilterInput = {
  eq?: InputMaybe<RelocationReason>;
  in?: InputMaybe<Array<InputMaybe<RelocationReason>>>;
  neq?: InputMaybe<RelocationReason>;
  nin?: InputMaybe<Array<InputMaybe<RelocationReason>>>;
};

export type NullableOfTripTypeOperationFilterInput = {
  eq?: InputMaybe<TripType>;
  in?: InputMaybe<Array<InputMaybe<TripType>>>;
  neq?: InputMaybe<TripType>;
  nin?: InputMaybe<Array<InputMaybe<TripType>>>;
};

export enum OgcGeometryType {
  CircularString = 'CIRCULAR_STRING',
  CompoundCurve = 'COMPOUND_CURVE',
  Curve = 'CURVE',
  CurvePolygon = 'CURVE_POLYGON',
  GeometryCollection = 'GEOMETRY_COLLECTION',
  LineString = 'LINE_STRING',
  MultiCurve = 'MULTI_CURVE',
  MultiLineString = 'MULTI_LINE_STRING',
  MultiPoint = 'MULTI_POINT',
  MultiPolygon = 'MULTI_POLYGON',
  MultiSurface = 'MULTI_SURFACE',
  Point = 'POINT',
  Polygon = 'POLYGON',
  PolyhedralSurface = 'POLYHEDRAL_SURFACE',
  Surface = 'SURFACE',
  Tin = 'TIN'
}

export type OgcGeometryTypeOperationFilterInput = {
  eq?: InputMaybe<OgcGeometryType>;
  in?: InputMaybe<Array<OgcGeometryType>>;
  neq?: InputMaybe<OgcGeometryType>;
  nin?: InputMaybe<Array<OgcGeometryType>>;
};

export enum Ordinates {
  AllMeasureOrdinates = 'ALL_MEASURE_ORDINATES',
  AllOrdinates = 'ALL_ORDINATES',
  AllSpatialOrdinates = 'ALL_SPATIAL_ORDINATES',
  Measure1 = 'MEASURE1',
  Measure2 = 'MEASURE2',
  Measure3 = 'MEASURE3',
  Measure4 = 'MEASURE4',
  Measure5 = 'MEASURE5',
  Measure6 = 'MEASURE6',
  Measure7 = 'MEASURE7',
  Measure8 = 'MEASURE8',
  Measure9 = 'MEASURE9',
  Measure10 = 'MEASURE10',
  Measure11 = 'MEASURE11',
  Measure12 = 'MEASURE12',
  Measure13 = 'MEASURE13',
  Measure14 = 'MEASURE14',
  Measure15 = 'MEASURE15',
  Measure16 = 'MEASURE16',
  None = 'NONE',
  Spatial1 = 'SPATIAL1',
  Spatial2 = 'SPATIAL2',
  Spatial3 = 'SPATIAL3',
  Spatial4 = 'SPATIAL4',
  Spatial5 = 'SPATIAL5',
  Spatial6 = 'SPATIAL6',
  Spatial7 = 'SPATIAL7',
  Spatial8 = 'SPATIAL8',
  Spatial9 = 'SPATIAL9',
  Spatial10 = 'SPATIAL10',
  Spatial11 = 'SPATIAL11',
  Spatial12 = 'SPATIAL12',
  Spatial13 = 'SPATIAL13',
  Spatial14 = 'SPATIAL14',
  Spatial15 = 'SPATIAL15',
  Spatial16 = 'SPATIAL16',
  Xy = 'XY',
  Xym = 'XYM',
  Xyz = 'XYZ',
  Xyzm = 'XYZM'
}

export type OrdinatesOperationFilterInput = {
  eq?: InputMaybe<Ordinates>;
  in?: InputMaybe<Array<Ordinates>>;
  neq?: InputMaybe<Ordinates>;
  nin?: InputMaybe<Array<Ordinates>>;
};

export type PersonNameIdModel = {
  __typename?: 'PersonNameIdModel';
  additionalLastName?: Maybe<Scalars['String']['output']>;
  displayName?: Maybe<Scalars['String']['output']>;
  firstName: Scalars['String']['output'];
  lastName: Scalars['String']['output'];
  middleName: Scalars['String']['output'];
  personId: Scalars['String']['output'];
  prefix?: Maybe<Scalars['String']['output']>;
  suffix?: Maybe<Scalars['String']['output']>;
};

export type PersonNameIdModelFilterInput = {
  additionalLastName?: InputMaybe<StringOperationFilterInput>;
  and?: InputMaybe<Array<PersonNameIdModelFilterInput>>;
  displayName?: InputMaybe<StringOperationFilterInput>;
  firstName?: InputMaybe<StringOperationFilterInput>;
  lastName?: InputMaybe<StringOperationFilterInput>;
  middleName?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<PersonNameIdModelFilterInput>>;
  personId?: InputMaybe<StringOperationFilterInput>;
  prefix?: InputMaybe<StringOperationFilterInput>;
  suffix?: InputMaybe<StringOperationFilterInput>;
};

export type PersonNameIdModelSortInput = {
  additionalLastName?: InputMaybe<SortEnumType>;
  displayName?: InputMaybe<SortEnumType>;
  firstName?: InputMaybe<SortEnumType>;
  lastName?: InputMaybe<SortEnumType>;
  middleName?: InputMaybe<SortEnumType>;
  personId?: InputMaybe<SortEnumType>;
  prefix?: InputMaybe<SortEnumType>;
  suffix?: InputMaybe<SortEnumType>;
};

/** A segment of a collection. */
export type PersonScheduleByIdCollectionSegment = {
  __typename?: 'PersonScheduleByIdCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<PersonScheduleEntity>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

export type PersonScheduleEntity = {
  __typename?: 'PersonScheduleEntity';
  createdAt: Scalars['DateTime']['output'];
  endDateTime: Scalars['DateTime']['output'];
  horseAppointments: Array<HorseAppointmentEntity>;
  locationAppointmentId?: Maybe<Scalars['Int']['output']>;
  locationSchedule: LocationAppointmentEntity;
  personId: Scalars['String']['output'];
  personScheduleId: Scalars['Int']['output'];
  personScheduleType: PersonScheduleTypeEnum;
  startDateTime: Scalars['DateTime']['output'];
};

export type PersonScheduleEntityFilterInput = {
  and?: InputMaybe<Array<PersonScheduleEntityFilterInput>>;
  createdAt?: InputMaybe<DateTimeOperationFilterInput>;
  endDateTime?: InputMaybe<DateTimeOperationFilterInput>;
  horseAppointments?: InputMaybe<ListFilterInputTypeOfHorseAppointmentEntityFilterInput>;
  locationAppointmentId?: InputMaybe<IntOperationFilterInput>;
  locationSchedule?: InputMaybe<LocationAppointmentEntityFilterInput>;
  or?: InputMaybe<Array<PersonScheduleEntityFilterInput>>;
  personId?: InputMaybe<StringOperationFilterInput>;
  personScheduleId?: InputMaybe<IntOperationFilterInput>;
  personScheduleType?: InputMaybe<PersonScheduleTypeEnumOperationFilterInput>;
  startDateTime?: InputMaybe<DateTimeOperationFilterInput>;
};

export type PersonScheduleEntitySortInput = {
  createdAt?: InputMaybe<SortEnumType>;
  endDateTime?: InputMaybe<SortEnumType>;
  locationAppointmentId?: InputMaybe<SortEnumType>;
  locationSchedule?: InputMaybe<LocationAppointmentEntitySortInput>;
  personId?: InputMaybe<SortEnumType>;
  personScheduleId?: InputMaybe<SortEnumType>;
  personScheduleType?: InputMaybe<SortEnumType>;
  startDateTime?: InputMaybe<SortEnumType>;
};

export enum PersonScheduleTypeEnum {
  Blood = 'BLOOD'
}

export type PersonScheduleTypeEnumOperationFilterInput = {
  eq?: InputMaybe<PersonScheduleTypeEnum>;
  in?: InputMaybe<Array<PersonScheduleTypeEnum>>;
  neq?: InputMaybe<PersonScheduleTypeEnum>;
  nin?: InputMaybe<Array<PersonScheduleTypeEnum>>;
};

/** A segment of a collection. */
export type PersonSchedulesCollectionSegment = {
  __typename?: 'PersonSchedulesCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<PersonScheduleEntity>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

export type PointFilterInput = {
  and?: InputMaybe<Array<PointFilterInput>>;
  area?: InputMaybe<FloatOperationFilterInput>;
  boundary?: InputMaybe<GeometryFilterInput>;
  boundaryDimension?: InputMaybe<DimensionOperationFilterInput>;
  centroid?: InputMaybe<PointFilterInput>;
  coordinate?: InputMaybe<CoordinateFilterInput>;
  coordinateSequence?: InputMaybe<CoordinateSequenceFilterInput>;
  coordinates?: InputMaybe<ListFilterInputTypeOfCoordinateFilterInput>;
  dimension?: InputMaybe<DimensionOperationFilterInput>;
  envelope?: InputMaybe<GeometryFilterInput>;
  envelopeInternal?: InputMaybe<EnvelopeFilterInput>;
  factory?: InputMaybe<GeometryFactoryFilterInput>;
  geometryType?: InputMaybe<StringOperationFilterInput>;
  interiorPoint?: InputMaybe<PointFilterInput>;
  isEmpty?: InputMaybe<BooleanOperationFilterInput>;
  isRectangle?: InputMaybe<BooleanOperationFilterInput>;
  isSimple?: InputMaybe<BooleanOperationFilterInput>;
  isValid?: InputMaybe<BooleanOperationFilterInput>;
  length?: InputMaybe<FloatOperationFilterInput>;
  m?: InputMaybe<FloatOperationFilterInput>;
  numGeometries?: InputMaybe<IntOperationFilterInput>;
  numPoints?: InputMaybe<IntOperationFilterInput>;
  ogcGeometryType?: InputMaybe<OgcGeometryTypeOperationFilterInput>;
  or?: InputMaybe<Array<PointFilterInput>>;
  pointOnSurface?: InputMaybe<PointFilterInput>;
  precisionModel?: InputMaybe<PrecisionModelFilterInput>;
  srid?: InputMaybe<IntOperationFilterInput>;
  x?: InputMaybe<FloatOperationFilterInput>;
  y?: InputMaybe<FloatOperationFilterInput>;
  z?: InputMaybe<FloatOperationFilterInput>;
};

export type PointSortInput = {
  x?: InputMaybe<SortEnumType>;
  y?: InputMaybe<SortEnumType>;
  z?: InputMaybe<SortEnumType>;
};

export type PostLayoffReport = {
  __typename?: 'PostLayoffReport';
  Location?: Maybe<LocationResponse>;
  additionalNotes?: Maybe<Scalars['String']['output']>;
  adminNotes?: Maybe<Scalars['String']['output']>;
  associatedInjuries: Array<PostLayoffReportInjury>;
  associatedMedicalRecords: Array<PostLayoffReportMedicalRecord>;
  associatedVetListRecords: Array<PostLayoffReportVetList>;
  completionDate?: Maybe<Scalars['Date']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  expirationDate?: Maybe<Scalars['Date']['output']>;
  hisaHorseId: Scalars['String']['output'];
  hisaLocationId: Scalars['String']['output'];
  hisaOwnerId: Scalars['String']['output'];
  hisaSubmitterId: Scalars['String']['output'];
  hisaTrainerId: Scalars['String']['output'];
  hisaTreatingVetId?: Maybe<Scalars['String']['output']>;
  horseInfo?: Maybe<CoveredHorseExtendedResponse>;
  horseName: Scalars['String']['output'];
  isDeleted?: Maybe<Scalars['Boolean']['output']>;
  isHidden?: Maybe<Scalars['Boolean']['output']>;
  lastRaceDate?: Maybe<Scalars['Date']['output']>;
  layoffReason: Scalars['String']['output'];
  locationName: Scalars['String']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  otherLayoffReason?: Maybe<Scalars['String']['output']>;
  owner: PersonNameIdModel;
  pendingSince?: Maybe<Scalars['Date']['output']>;
  postLayoffReportDisplayId: Scalars['String']['output'];
  postLayoffReportId: Scalars['Int']['output'];
  raceEntries: Array<PostLayoffReportRaceEntry>;
  racedDateAfterSubmission?: Maybe<Scalars['Date']['output']>;
  reportedTreatments: Array<PostLayoffReportTreatment>;
  status: PostLayoffReportStatus;
  statusUpdatedBy?: Maybe<PersonNameIdModel>;
  statusUpdatedById?: Maybe<Scalars['String']['output']>;
  submissionDate?: Maybe<Scalars['Date']['output']>;
  submitter: PersonNameIdModel;
  trainer: PersonNameIdModel;
  trainerEmail?: Maybe<Scalars['String']['output']>;
  trainerMobileNumber?: Maybe<Scalars['String']['output']>;
  treatingVet?: Maybe<PersonNameIdModel>;
};

/** A segment of a collection. */
export type PostLayoffReportByIdCollectionSegment = {
  __typename?: 'PostLayoffReportByIdCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<PostLayoffReport>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

export type PostLayoffReportFilterInput = {
  additionalNotes?: InputMaybe<StringOperationFilterInput>;
  adminNotes?: InputMaybe<StringOperationFilterInput>;
  and?: InputMaybe<Array<PostLayoffReportFilterInput>>;
  associatedInjuries?: InputMaybe<ListFilterInputTypeOfPostLayoffReportInjuryFilterInput>;
  associatedMedicalRecords?: InputMaybe<ListFilterInputTypeOfPostLayoffReportMedicalRecordFilterInput>;
  associatedVetListRecords?: InputMaybe<ListFilterInputTypeOfPostLayoffReportVetListFilterInput>;
  completionDate?: InputMaybe<DateOperationFilterInput>;
  createdAt?: InputMaybe<DateTimeOperationFilterInput>;
  expirationDate?: InputMaybe<DateOperationFilterInput>;
  hisaHorseId?: InputMaybe<StringOperationFilterInput>;
  hisaLocationId?: InputMaybe<StringOperationFilterInput>;
  hisaOwnerId?: InputMaybe<StringOperationFilterInput>;
  hisaSubmitterId?: InputMaybe<StringOperationFilterInput>;
  hisaTrainerId?: InputMaybe<StringOperationFilterInput>;
  hisaTreatingVetId?: InputMaybe<StringOperationFilterInput>;
  horseName?: InputMaybe<StringOperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  isHidden?: InputMaybe<BooleanOperationFilterInput>;
  lastRaceDate?: InputMaybe<DateOperationFilterInput>;
  layoffReason?: InputMaybe<StringOperationFilterInput>;
  locationName?: InputMaybe<StringOperationFilterInput>;
  notes?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<PostLayoffReportFilterInput>>;
  otherLayoffReason?: InputMaybe<StringOperationFilterInput>;
  owner?: InputMaybe<PersonNameIdModelFilterInput>;
  pendingSince?: InputMaybe<DateOperationFilterInput>;
  postLayoffReportDisplayId?: InputMaybe<StringOperationFilterInput>;
  postLayoffReportId?: InputMaybe<IntOperationFilterInput>;
  raceEntries?: InputMaybe<ListFilterInputTypeOfPostLayoffReportRaceEntryFilterInput>;
  racedDateAfterSubmission?: InputMaybe<DateOperationFilterInput>;
  reportedTreatments?: InputMaybe<ListFilterInputTypeOfPostLayoffReportTreatmentFilterInput>;
  status?: InputMaybe<PostLayoffReportStatusOperationFilterInput>;
  statusUpdatedBy?: InputMaybe<PersonNameIdModelFilterInput>;
  statusUpdatedById?: InputMaybe<StringOperationFilterInput>;
  submissionDate?: InputMaybe<DateOperationFilterInput>;
  submitter?: InputMaybe<PersonNameIdModelFilterInput>;
  trainer?: InputMaybe<PersonNameIdModelFilterInput>;
  trainerEmail?: InputMaybe<StringOperationFilterInput>;
  trainerMobileNumber?: InputMaybe<StringOperationFilterInput>;
  treatingVet?: InputMaybe<PersonNameIdModelFilterInput>;
};

export type PostLayoffReportInjury = {
  __typename?: 'PostLayoffReportInjury';
  injuryId: Scalars['String']['output'];
  postLayoffReport: PostLayoffReport;
  postLayoffReportId: Scalars['Int']['output'];
};

export type PostLayoffReportInjuryFilterInput = {
  and?: InputMaybe<Array<PostLayoffReportInjuryFilterInput>>;
  injuryId?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<PostLayoffReportInjuryFilterInput>>;
  postLayoffReport?: InputMaybe<PostLayoffReportFilterInput>;
  postLayoffReportId?: InputMaybe<IntOperationFilterInput>;
};

export type PostLayoffReportMedicalRecord = {
  __typename?: 'PostLayoffReportMedicalRecord';
  medicalRecordId: Scalars['String']['output'];
  postLayoffReport: PostLayoffReport;
  postLayoffReportId: Scalars['Int']['output'];
};

export type PostLayoffReportMedicalRecordFilterInput = {
  and?: InputMaybe<Array<PostLayoffReportMedicalRecordFilterInput>>;
  medicalRecordId?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<PostLayoffReportMedicalRecordFilterInput>>;
  postLayoffReport?: InputMaybe<PostLayoffReportFilterInput>;
  postLayoffReportId?: InputMaybe<IntOperationFilterInput>;
};

export type PostLayoffReportProcedure = {
  __typename?: 'PostLayoffReportProcedure';
  date: Scalars['Date']['output'];
  details: Scalars['String']['output'];
  hisaVetId?: Maybe<Scalars['String']['output']>;
  medicalRecordId?: Maybe<Scalars['String']['output']>;
  postLayoffReportProcedureId: Scalars['Int']['output'];
  postLayoffReportTreatment: PostLayoffReportTreatment;
  postLayoffReportTreatmentId: Scalars['Int']['output'];
  vet?: Maybe<PersonNameIdModel>;
};

export type PostLayoffReportProcedureFilterInput = {
  and?: InputMaybe<Array<PostLayoffReportProcedureFilterInput>>;
  date?: InputMaybe<DateOperationFilterInput>;
  details?: InputMaybe<StringOperationFilterInput>;
  hisaVetId?: InputMaybe<StringOperationFilterInput>;
  medicalRecordId?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<PostLayoffReportProcedureFilterInput>>;
  postLayoffReportProcedureId?: InputMaybe<IntOperationFilterInput>;
  postLayoffReportTreatment?: InputMaybe<PostLayoffReportTreatmentFilterInput>;
  postLayoffReportTreatmentId?: InputMaybe<IntOperationFilterInput>;
  vet?: InputMaybe<PersonNameIdModelFilterInput>;
};

export type PostLayoffReportRaceEntry = {
  __typename?: 'PostLayoffReportRaceEntry';
  date?: Maybe<Scalars['Date']['output']>;
  hisaLocationId?: Maybe<Scalars['String']['output']>;
  kind: PostLayoffReportRaceEntryKind;
  locationName?: Maybe<Scalars['String']['output']>;
  postLayoffReport: PostLayoffReport;
  postLayoffReportId: Scalars['Int']['output'];
  postLayoffReportRaceEntryId: Scalars['Int']['output'];
};

export type PostLayoffReportRaceEntryFilterInput = {
  and?: InputMaybe<Array<PostLayoffReportRaceEntryFilterInput>>;
  date?: InputMaybe<DateOperationFilterInput>;
  hisaLocationId?: InputMaybe<StringOperationFilterInput>;
  kind?: InputMaybe<PostLayoffReportRaceEntryKindOperationFilterInput>;
  locationName?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<PostLayoffReportRaceEntryFilterInput>>;
  postLayoffReport?: InputMaybe<PostLayoffReportFilterInput>;
  postLayoffReportId?: InputMaybe<IntOperationFilterInput>;
  postLayoffReportRaceEntryId?: InputMaybe<IntOperationFilterInput>;
};

export enum PostLayoffReportRaceEntryKind {
  LastRace = 'LAST_RACE',
  PlannedRace = 'PLANNED_RACE'
}

export type PostLayoffReportRaceEntryKindOperationFilterInput = {
  eq?: InputMaybe<PostLayoffReportRaceEntryKind>;
  in?: InputMaybe<Array<PostLayoffReportRaceEntryKind>>;
  neq?: InputMaybe<PostLayoffReportRaceEntryKind>;
  nin?: InputMaybe<Array<PostLayoffReportRaceEntryKind>>;
};

export type PostLayoffReportSortInput = {
  additionalNotes?: InputMaybe<SortEnumType>;
  adminNotes?: InputMaybe<SortEnumType>;
  completionDate?: InputMaybe<SortEnumType>;
  createdAt?: InputMaybe<SortEnumType>;
  expirationDate?: InputMaybe<SortEnumType>;
  hisaHorseId?: InputMaybe<SortEnumType>;
  hisaLocationId?: InputMaybe<SortEnumType>;
  hisaOwnerId?: InputMaybe<SortEnumType>;
  hisaSubmitterId?: InputMaybe<SortEnumType>;
  hisaTrainerId?: InputMaybe<SortEnumType>;
  hisaTreatingVetId?: InputMaybe<SortEnumType>;
  horseName?: InputMaybe<SortEnumType>;
  isDeleted?: InputMaybe<SortEnumType>;
  isHidden?: InputMaybe<SortEnumType>;
  lastRaceDate?: InputMaybe<SortEnumType>;
  layoffReason?: InputMaybe<SortEnumType>;
  locationName?: InputMaybe<SortEnumType>;
  notes?: InputMaybe<SortEnumType>;
  otherLayoffReason?: InputMaybe<SortEnumType>;
  owner?: InputMaybe<PersonNameIdModelSortInput>;
  pendingSince?: InputMaybe<SortEnumType>;
  postLayoffReportDisplayId?: InputMaybe<SortEnumType>;
  postLayoffReportId?: InputMaybe<SortEnumType>;
  racedDateAfterSubmission?: InputMaybe<SortEnumType>;
  status?: InputMaybe<SortEnumType>;
  statusUpdatedBy?: InputMaybe<PersonNameIdModelSortInput>;
  statusUpdatedById?: InputMaybe<SortEnumType>;
  submissionDate?: InputMaybe<SortEnumType>;
  submitter?: InputMaybe<PersonNameIdModelSortInput>;
  trainer?: InputMaybe<PersonNameIdModelSortInput>;
  trainerEmail?: InputMaybe<SortEnumType>;
  trainerMobileNumber?: InputMaybe<SortEnumType>;
  treatingVet?: InputMaybe<PersonNameIdModelSortInput>;
};

export enum PostLayoffReportStatus {
  Complete = 'COMPLETE',
  Expired = 'EXPIRED',
  Pending = 'PENDING',
  Submitted = 'SUBMITTED',
  Unsubmitted = 'UNSUBMITTED'
}

export type PostLayoffReportStatusOperationFilterInput = {
  eq?: InputMaybe<PostLayoffReportStatus>;
  in?: InputMaybe<Array<PostLayoffReportStatus>>;
  neq?: InputMaybe<PostLayoffReportStatus>;
  nin?: InputMaybe<Array<PostLayoffReportStatus>>;
};

export type PostLayoffReportTreatment = {
  __typename?: 'PostLayoffReportTreatment';
  date: Scalars['Date']['output'];
  isReasonForLayoff: Scalars['Boolean']['output'];
  kind: PostLayoffTreatmentKind;
  notes: Scalars['String']['output'];
  postLayoffReport: PostLayoffReport;
  postLayoffReportId: Scalars['Int']['output'];
  postLayoffReportTreatmentId: Scalars['Int']['output'];
  procedures: Array<PostLayoffReportProcedure>;
  reason: Scalars['String']['output'];
};

export type PostLayoffReportTreatmentFilterInput = {
  and?: InputMaybe<Array<PostLayoffReportTreatmentFilterInput>>;
  date?: InputMaybe<DateOperationFilterInput>;
  isReasonForLayoff?: InputMaybe<BooleanOperationFilterInput>;
  kind?: InputMaybe<PostLayoffTreatmentKindOperationFilterInput>;
  notes?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<PostLayoffReportTreatmentFilterInput>>;
  postLayoffReport?: InputMaybe<PostLayoffReportFilterInput>;
  postLayoffReportId?: InputMaybe<IntOperationFilterInput>;
  postLayoffReportTreatmentId?: InputMaybe<IntOperationFilterInput>;
  procedures?: InputMaybe<ListFilterInputTypeOfPostLayoffReportProcedureFilterInput>;
  reason?: InputMaybe<StringOperationFilterInput>;
};

export type PostLayoffReportVetList = {
  __typename?: 'PostLayoffReportVetList';
  postLayoffReport: PostLayoffReport;
  postLayoffReportId: Scalars['Int']['output'];
  vetListId: Scalars['String']['output'];
};

export type PostLayoffReportVetListFilterInput = {
  and?: InputMaybe<Array<PostLayoffReportVetListFilterInput>>;
  or?: InputMaybe<Array<PostLayoffReportVetListFilterInput>>;
  postLayoffReport?: InputMaybe<PostLayoffReportFilterInput>;
  postLayoffReportId?: InputMaybe<IntOperationFilterInput>;
  vetListId?: InputMaybe<StringOperationFilterInput>;
};

/** A segment of a collection. */
export type PostLayoffReportsCollectionSegment = {
  __typename?: 'PostLayoffReportsCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<PostLayoffReport>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

export enum PostLayoffTreatmentKind {
  IntraArticularInjection = 'INTRA_ARTICULAR_INJECTION',
  Medications = 'MEDICATIONS',
  Procedures = 'PROCEDURES',
  Shockwave = 'SHOCKWAVE',
  Surgery = 'SURGERY',
  Unknown = 'UNKNOWN'
}

export type PostLayoffTreatmentKindOperationFilterInput = {
  eq?: InputMaybe<PostLayoffTreatmentKind>;
  in?: InputMaybe<Array<PostLayoffTreatmentKind>>;
  neq?: InputMaybe<PostLayoffTreatmentKind>;
  nin?: InputMaybe<Array<PostLayoffTreatmentKind>>;
};

export type PrecisionModelFilterInput = {
  and?: InputMaybe<Array<PrecisionModelFilterInput>>;
  gridSize?: InputMaybe<FloatOperationFilterInput>;
  isFloating?: InputMaybe<BooleanOperationFilterInput>;
  maximumSignificantDigits?: InputMaybe<IntOperationFilterInput>;
  or?: InputMaybe<Array<PrecisionModelFilterInput>>;
  precisionModelType?: InputMaybe<PrecisionModelsOperationFilterInput>;
  scale?: InputMaybe<FloatOperationFilterInput>;
};

export enum PrecisionModels {
  Fixed = 'FIXED',
  Floating = 'FLOATING',
  FloatingSingle = 'FLOATING_SINGLE'
}

export type PrecisionModelsOperationFilterInput = {
  eq?: InputMaybe<PrecisionModels>;
  in?: InputMaybe<Array<PrecisionModels>>;
  neq?: InputMaybe<PrecisionModels>;
  nin?: InputMaybe<Array<PrecisionModels>>;
};

export type QueryString = {
  __typename?: 'QueryString';
  add: QueryString;
  hasValue: Scalars['Boolean']['output'];
  toUriComponent: Scalars['String']['output'];
  value?: Maybe<Scalars['String']['output']>;
};


export type QueryStringAddArgs = {
  other: QueryStringInput;
};

export type QueryStringInput = {
  value?: InputMaybe<Scalars['String']['input']>;
};

export type ReadyToRunRaceEntry = {
  __typename?: 'ReadyToRunRaceEntry';
  date?: Maybe<Scalars['Date']['output']>;
  locationId?: Maybe<Scalars['String']['output']>;
  rtrReportId: Scalars['Int']['output'];
  type: ReadyToRunRaceEntryType;
};

export type ReadyToRunRaceEntryFilterInput = {
  and?: InputMaybe<Array<ReadyToRunRaceEntryFilterInput>>;
  date?: InputMaybe<DateOperationFilterInput>;
  locationId?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<ReadyToRunRaceEntryFilterInput>>;
  rtrReportId?: InputMaybe<IntOperationFilterInput>;
  type?: InputMaybe<ReadyToRunRaceEntryTypeOperationFilterInput>;
};

export enum ReadyToRunRaceEntryType {
  Intended = 'INTENDED',
  Last = 'LAST',
  Unspecified = 'UNSPECIFIED'
}

export type ReadyToRunRaceEntryTypeOperationFilterInput = {
  eq?: InputMaybe<ReadyToRunRaceEntryType>;
  in?: InputMaybe<Array<ReadyToRunRaceEntryType>>;
  neq?: InputMaybe<ReadyToRunRaceEntryType>;
  nin?: InputMaybe<Array<ReadyToRunRaceEntryType>>;
};

export type ReadyToRunReport = {
  __typename?: 'ReadyToRunReport';
  Location?: Maybe<LocationResponse>;
  approvingAttendingVetId?: Maybe<Scalars['String']['output']>;
  approvingResponsiblePersonId?: Maybe<Scalars['String']['output']>;
  attendingVetSubmissionNotes?: Maybe<Scalars['String']['output']>;
  author: PersonNameIdModel;
  authorId: Scalars['String']['output'];
  awaitingReplySince?: Maybe<Scalars['Date']['output']>;
  barnNumber?: Maybe<Scalars['String']['output']>;
  completedOn?: Maybe<Scalars['Date']['output']>;
  createdAt: Scalars['DateTime']['output'];
  dateSetOn?: Maybe<Scalars['Date']['output']>;
  discussions: Array<ReadyToRunReportDiscussion>;
  expiredOn?: Maybe<Scalars['Date']['output']>;
  failedOn?: Maybe<Scalars['Date']['output']>;
  horseId: Scalars['String']['output'];
  horseInfo?: Maybe<CoveredHorseExtendedResponse>;
  horseName: Scalars['String']['output'];
  isHorseShippedIn: Scalars['Boolean']['output'];
  layoffReason: Scalars['String']['output'];
  locationId: Scalars['String']['output'];
  locationName?: Maybe<Scalars['String']['output']>;
  medicalSummaries: Array<RtrReportMedicalSummary>;
  otherLayoffReason?: Maybe<Scalars['String']['output']>;
  owner: PersonNameIdModel;
  ownerId: Scalars['String']['output'];
  raceEntries: Array<ReadyToRunRaceEntry>;
  rejectedOn?: Maybe<Scalars['Date']['output']>;
  responsiblePerson: PersonNameIdModel;
  responsiblePersonId: Scalars['String']['output'];
  reviewingVet?: Maybe<PersonNameIdModel>;
  reviewingVetId?: Maybe<Scalars['String']['output']>;
  rpSubmissionNotes?: Maybe<Scalars['String']['output']>;
  rtrReportDisplayId: Scalars['String']['output'];
  rtrReportId: Scalars['Int']['output'];
  schedulingSince?: Maybe<Scalars['Date']['output']>;
  status: RtrReportStatus;
  statusReasons: Array<ReadyToRunStatusReason>;
  statusSetBy?: Maybe<Scalars['String']['output']>;
  submittedOn?: Maybe<Scalars['Date']['output']>;
  treatingVet?: Maybe<PersonNameIdModel>;
  treatingVetId?: Maybe<Scalars['String']['output']>;
  type: RtrReportType;
  underReviewSince?: Maybe<Scalars['Date']['output']>;
  workOffResult?: Maybe<ReadyToRunWorkOffResult>;
};

export type ReadyToRunReportDiscussion = {
  __typename?: 'ReadyToRunReportDiscussion';
  discussion: DiscussionEntity;
  discussionId: Scalars['Int']['output'];
  rtrReportDiscussionId: Scalars['Int']['output'];
  rtrReportId: Scalars['Int']['output'];
};

export type ReadyToRunReportDiscussionFilterInput = {
  and?: InputMaybe<Array<ReadyToRunReportDiscussionFilterInput>>;
  discussion?: InputMaybe<DiscussionEntityFilterInput>;
  discussionId?: InputMaybe<IntOperationFilterInput>;
  or?: InputMaybe<Array<ReadyToRunReportDiscussionFilterInput>>;
  rtrReportDiscussionId?: InputMaybe<IntOperationFilterInput>;
  rtrReportId?: InputMaybe<IntOperationFilterInput>;
};

export type ReadyToRunReportFilterInput = {
  and?: InputMaybe<Array<ReadyToRunReportFilterInput>>;
  approvingAttendingVetId?: InputMaybe<StringOperationFilterInput>;
  approvingResponsiblePersonId?: InputMaybe<StringOperationFilterInput>;
  attendingVetSubmissionNotes?: InputMaybe<StringOperationFilterInput>;
  author?: InputMaybe<PersonNameIdModelFilterInput>;
  authorId?: InputMaybe<StringOperationFilterInput>;
  awaitingReplySince?: InputMaybe<DateOperationFilterInput>;
  barnNumber?: InputMaybe<StringOperationFilterInput>;
  completedOn?: InputMaybe<DateOperationFilterInput>;
  createdAt?: InputMaybe<DateTimeOperationFilterInput>;
  dateSetOn?: InputMaybe<DateOperationFilterInput>;
  discussions?: InputMaybe<ListFilterInputTypeOfReadyToRunReportDiscussionFilterInput>;
  expiredOn?: InputMaybe<DateOperationFilterInput>;
  failedOn?: InputMaybe<DateOperationFilterInput>;
  horseId?: InputMaybe<StringOperationFilterInput>;
  horseName?: InputMaybe<StringOperationFilterInput>;
  isHorseShippedIn?: InputMaybe<BooleanOperationFilterInput>;
  layoffReason?: InputMaybe<StringOperationFilterInput>;
  locationId?: InputMaybe<StringOperationFilterInput>;
  locationName?: InputMaybe<StringOperationFilterInput>;
  medicalSummaries?: InputMaybe<ListFilterInputTypeOfRtrReportMedicalSummaryFilterInput>;
  or?: InputMaybe<Array<ReadyToRunReportFilterInput>>;
  otherLayoffReason?: InputMaybe<StringOperationFilterInput>;
  owner?: InputMaybe<PersonNameIdModelFilterInput>;
  ownerId?: InputMaybe<StringOperationFilterInput>;
  raceEntries?: InputMaybe<ListFilterInputTypeOfReadyToRunRaceEntryFilterInput>;
  rejectedOn?: InputMaybe<DateOperationFilterInput>;
  responsiblePerson?: InputMaybe<PersonNameIdModelFilterInput>;
  responsiblePersonId?: InputMaybe<StringOperationFilterInput>;
  reviewingVet?: InputMaybe<PersonNameIdModelFilterInput>;
  reviewingVetId?: InputMaybe<StringOperationFilterInput>;
  rpSubmissionNotes?: InputMaybe<StringOperationFilterInput>;
  rtrReportDisplayId?: InputMaybe<StringOperationFilterInput>;
  rtrReportId?: InputMaybe<IntOperationFilterInput>;
  schedulingSince?: InputMaybe<DateOperationFilterInput>;
  status?: InputMaybe<RtrReportStatusOperationFilterInput>;
  statusReasons?: InputMaybe<ListFilterInputTypeOfReadyToRunStatusReasonFilterInput>;
  statusSetBy?: InputMaybe<StringOperationFilterInput>;
  submittedOn?: InputMaybe<DateOperationFilterInput>;
  treatingVet?: InputMaybe<PersonNameIdModelFilterInput>;
  treatingVetId?: InputMaybe<StringOperationFilterInput>;
  type?: InputMaybe<RtrReportTypeOperationFilterInput>;
  underReviewSince?: InputMaybe<DateOperationFilterInput>;
  workOffResult?: InputMaybe<ReadyToRunWorkOffResultFilterInput>;
};

export type ReadyToRunReportSortInput = {
  approvingAttendingVetId?: InputMaybe<SortEnumType>;
  approvingResponsiblePersonId?: InputMaybe<SortEnumType>;
  attendingVetSubmissionNotes?: InputMaybe<SortEnumType>;
  author?: InputMaybe<PersonNameIdModelSortInput>;
  authorId?: InputMaybe<SortEnumType>;
  awaitingReplySince?: InputMaybe<SortEnumType>;
  barnNumber?: InputMaybe<SortEnumType>;
  completedOn?: InputMaybe<SortEnumType>;
  createdAt?: InputMaybe<SortEnumType>;
  dateSetOn?: InputMaybe<SortEnumType>;
  expiredOn?: InputMaybe<SortEnumType>;
  failedOn?: InputMaybe<SortEnumType>;
  horseId?: InputMaybe<SortEnumType>;
  horseName?: InputMaybe<SortEnumType>;
  isHorseShippedIn?: InputMaybe<SortEnumType>;
  layoffReason?: InputMaybe<SortEnumType>;
  locationId?: InputMaybe<SortEnumType>;
  locationName?: InputMaybe<SortEnumType>;
  otherLayoffReason?: InputMaybe<SortEnumType>;
  owner?: InputMaybe<PersonNameIdModelSortInput>;
  ownerId?: InputMaybe<SortEnumType>;
  rejectedOn?: InputMaybe<SortEnumType>;
  responsiblePerson?: InputMaybe<PersonNameIdModelSortInput>;
  responsiblePersonId?: InputMaybe<SortEnumType>;
  reviewingVet?: InputMaybe<PersonNameIdModelSortInput>;
  reviewingVetId?: InputMaybe<SortEnumType>;
  rpSubmissionNotes?: InputMaybe<SortEnumType>;
  rtrReportDisplayId?: InputMaybe<SortEnumType>;
  rtrReportId?: InputMaybe<SortEnumType>;
  schedulingSince?: InputMaybe<SortEnumType>;
  status?: InputMaybe<SortEnumType>;
  statusSetBy?: InputMaybe<SortEnumType>;
  submittedOn?: InputMaybe<SortEnumType>;
  treatingVet?: InputMaybe<PersonNameIdModelSortInput>;
  treatingVetId?: InputMaybe<SortEnumType>;
  type?: InputMaybe<SortEnumType>;
  underReviewSince?: InputMaybe<SortEnumType>;
  workOffResult?: InputMaybe<ReadyToRunWorkOffResultSortInput>;
};

export type ReadyToRunStatusReason = {
  __typename?: 'ReadyToRunStatusReason';
  addedAt?: Maybe<Scalars['DateTime']['output']>;
  addedBy?: Maybe<Scalars['String']['output']>;
  reason: Scalars['String']['output'];
  rtrReportId: Scalars['Int']['output'];
  status: RtrReportStatus;
};

export type ReadyToRunStatusReasonFilterInput = {
  addedAt?: InputMaybe<DateTimeOperationFilterInput>;
  addedBy?: InputMaybe<StringOperationFilterInput>;
  and?: InputMaybe<Array<ReadyToRunStatusReasonFilterInput>>;
  or?: InputMaybe<Array<ReadyToRunStatusReasonFilterInput>>;
  reason?: InputMaybe<StringOperationFilterInput>;
  rtrReportId?: InputMaybe<IntOperationFilterInput>;
  status?: InputMaybe<RtrReportStatusOperationFilterInput>;
};

export type ReadyToRunWorkOffReason = {
  __typename?: 'ReadyToRunWorkOffReason';
  reason: Scalars['String']['output'];
  rtrReportId: Scalars['Int']['output'];
  rtrWorkOffReasonId: Scalars['Int']['output'];
  rtrWorkOffResultId: Scalars['Int']['output'];
};

export type ReadyToRunWorkOffReasonFilterInput = {
  and?: InputMaybe<Array<ReadyToRunWorkOffReasonFilterInput>>;
  or?: InputMaybe<Array<ReadyToRunWorkOffReasonFilterInput>>;
  reason?: InputMaybe<StringOperationFilterInput>;
  rtrReportId?: InputMaybe<IntOperationFilterInput>;
  rtrWorkOffReasonId?: InputMaybe<IntOperationFilterInput>;
  rtrWorkOffResultId?: InputMaybe<IntOperationFilterInput>;
};

export type ReadyToRunWorkOffResult = {
  __typename?: 'ReadyToRunWorkOffResult';
  date: Scalars['Date']['output'];
  observationNotes: Scalars['String']['output'];
  passed: Scalars['Boolean']['output'];
  reasons: Array<ReadyToRunWorkOffReason>;
  regVetComments: Scalars['String']['output'];
  rtrReportId: Scalars['Int']['output'];
  rtrWorkOffResultId: Scalars['Int']['output'];
};

export type ReadyToRunWorkOffResultFilterInput = {
  and?: InputMaybe<Array<ReadyToRunWorkOffResultFilterInput>>;
  date?: InputMaybe<DateOperationFilterInput>;
  observationNotes?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<ReadyToRunWorkOffResultFilterInput>>;
  passed?: InputMaybe<BooleanOperationFilterInput>;
  reasons?: InputMaybe<ListFilterInputTypeOfReadyToRunWorkOffReasonFilterInput>;
  regVetComments?: InputMaybe<StringOperationFilterInput>;
  rtrReportId?: InputMaybe<IntOperationFilterInput>;
  rtrWorkOffResultId?: InputMaybe<IntOperationFilterInput>;
};

export type ReadyToRunWorkOffResultSortInput = {
  date?: InputMaybe<SortEnumType>;
  observationNotes?: InputMaybe<SortEnumType>;
  passed?: InputMaybe<SortEnumType>;
  regVetComments?: InputMaybe<SortEnumType>;
  rtrReportId?: InputMaybe<SortEnumType>;
  rtrWorkOffResultId?: InputMaybe<SortEnumType>;
};

export type RecordActivity = {
  __typename?: 'RecordActivity';
  created?: Maybe<RecordActivityDetail>;
  deleted?: Maybe<RecordActivityDetail>;
  lastAccess?: Maybe<RecordActivityDetail>;
  lastUpdate?: Maybe<RecordActivityDetail>;
};

export type RecordActivityDetail = {
  __typename?: 'RecordActivityDetail';
  appKey?: Maybe<Scalars['String']['output']>;
  date: Scalars['DateTime']['output'];
  spanId?: Maybe<Scalars['String']['output']>;
  traceId?: Maybe<Scalars['String']['output']>;
  uuid?: Maybe<Scalars['String']['output']>;
};

export type RecordActivityDetailFilterInput = {
  and?: InputMaybe<Array<RecordActivityDetailFilterInput>>;
  appKey?: InputMaybe<StringOperationFilterInput>;
  date?: InputMaybe<DateTimeOperationFilterInput>;
  or?: InputMaybe<Array<RecordActivityDetailFilterInput>>;
  spanId?: InputMaybe<StringOperationFilterInput>;
  traceId?: InputMaybe<StringOperationFilterInput>;
  uuid?: InputMaybe<StringOperationFilterInput>;
};

export type RecordActivityDetailSortInput = {
  appKey?: InputMaybe<SortEnumType>;
  date?: InputMaybe<SortEnumType>;
  spanId?: InputMaybe<SortEnumType>;
  traceId?: InputMaybe<SortEnumType>;
  uuid?: InputMaybe<SortEnumType>;
};

export type RecordActivityFilterInput = {
  and?: InputMaybe<Array<RecordActivityFilterInput>>;
  created?: InputMaybe<RecordActivityDetailFilterInput>;
  deleted?: InputMaybe<RecordActivityDetailFilterInput>;
  lastAccess?: InputMaybe<RecordActivityDetailFilterInput>;
  lastUpdate?: InputMaybe<RecordActivityDetailFilterInput>;
  or?: InputMaybe<Array<RecordActivityFilterInput>>;
};

export type RecordActivitySortInput = {
  created?: InputMaybe<RecordActivityDetailSortInput>;
  deleted?: InputMaybe<RecordActivityDetailSortInput>;
  lastAccess?: InputMaybe<RecordActivityDetailSortInput>;
  lastUpdate?: InputMaybe<RecordActivityDetailSortInput>;
};

export enum RelocationReason {
  Other = 'OTHER',
  Race = 'RACE',
  Stable = 'STABLE',
  Treatment = 'TREATMENT',
  Work = 'WORK'
}

/** Represents root query. */
export type RootQuery = {
  __typename?: 'RootQuery';
  /** Get horse appointment by id. */
  horseAppointmentById?: Maybe<HorseAppointmentByIdCollectionSegment>;
  /** Gets the queryable horse appointments. */
  horseAppointments?: Maybe<HorseAppointmentsCollectionSegment>;
  /** Get horse appointment by LocationId and date range. */
  horseAppointmentsByLocationDateRange?: Maybe<HorseAppointmentsByLocationDateRangeCollectionSegment>;
  /** Gets the queryable horse location report. */
  horseLocationReport?: Maybe<HorseLocationReportCollectionSegment>;
  /** Get horse location report by id. */
  horseLocationReportById?: Maybe<HorseLocationReportByIdCollectionSegment>;
  /** Gets the queryable horse location report. */
  horseTreatment?: Maybe<HorseTreatmentCollectionSegment>;
  /** Get horse location report by id. */
  horseTreatmentById?: Maybe<HorseTreatmentByIdCollectionSegment>;
  /** Gets the queryable LocationAppointment. */
  locationAppointment?: Maybe<LocationAppointmentCollectionSegment>;
  /** Get LocationAppointment by id. */
  locationAppointmentById?: Maybe<LocationAppointmentByIdCollectionSegment>;
  /** Get location by id. */
  locationById?: Maybe<LocationByIdCollectionSegment>;
  /** Gets the queryable locations. */
  locations?: Maybe<LocationsCollectionSegment>;
  /** Get PersonSchedule by id. */
  personScheduleById?: Maybe<PersonScheduleByIdCollectionSegment>;
  /** Gets the queryable PersonSchedule. */
  personSchedules?: Maybe<PersonSchedulesCollectionSegment>;
  /** Get PostLayoff by display id. */
  postLayoffReportById?: Maybe<PostLayoffReportByIdCollectionSegment>;
  /** Gets the queryable post layoff reports. */
  postLayoffReports?: Maybe<PostLayoffReportsCollectionSegment>;
  /** Get RTR report by display id. */
  rtrReportById?: Maybe<RtrReportByIdCollectionSegment>;
  /** Gets the queryable post layoff reports. */
  rtrReports?: Maybe<RtrReportsCollectionSegment>;
  /** Gets the queryable RunnersData. */
  runnersData?: Maybe<RunnersDataCollectionSegment>;
  /** Gets the queryable RunnersData by id. */
  runnersDataById?: Maybe<RunnersData>;
  /** Gets the queryable RunnersResult. */
  runnersResult?: Maybe<RunnersResultCollectionSegment>;
  /** Gets the queryable RunnersResult by id. */
  runnersResultById?: Maybe<RunnersResultData>;
  /** Get Scarches by display id. */
  scratchById?: Maybe<Scratch>;
  /** Gets the queryable scarches. */
  scratches?: Maybe<ScratchesCollectionSegment>;
  /** Search RTR reports by text. */
  searchRtrReports?: Maybe<SearchRtrReportsCollectionSegment>;
  /** Search transportation events. */
  searchTransportationEvents?: Maybe<SearchTransportationEventsCollectionSegment>;
  /** Gets the queryable TransactionLog by entity id. */
  transactionLogById?: Maybe<TransactionLog>;
  /** Gets the queryable TransactionLog. */
  transactionLogs?: Maybe<TransactionLogsCollectionSegment>;
  /** Gets a transportation event address by its ID. */
  transportationEventAddressById?: Maybe<TransportationEventAddressByIdCollectionSegment>;
  /** Gets the queryable transportation event addresses. */
  transportationEventAddresses?: Maybe<TransportationEventAddressesCollectionSegment>;
  /** Gets a paginated, sortable, and filterable list of transportation event details matching the specified ID. */
  transportationEventDetailById?: Maybe<TransportationEventDetailByIdCollectionSegment>;
  /** Gets a paginated, sortable, and filterable list of transportation event details. */
  transportationEventDetails?: Maybe<TransportationEventDetailsCollectionSegment>;
  /** Gets the queryable transportation events. */
  transportationEvents?: Maybe<TransportationEventsCollectionSegment>;
  /** Gets treatment protocol by id. */
  treatmentProtocolById?: Maybe<TreatmentProtocol>;
  /** Gets the queryable treatment protocols. */
  treatmentProtocols?: Maybe<TreatmentProtocolsCollectionSegment>;
  treatmentTemplateById?: Maybe<TreatmentTemplate>;
  treatmentTemplates?: Maybe<Array<Maybe<TreatmentTemplate>>>;
};


/** Represents root query. */
export type RootQueryHorseAppointmentByIdArgs = {
  id: Scalars['Int']['input'];
  order?: InputMaybe<Array<HorseAppointmentEntitySortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<HorseAppointmentEntityFilterInput>;
};


/** Represents root query. */
export type RootQueryHorseAppointmentsArgs = {
  order?: InputMaybe<Array<HorseAppointmentEntitySortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<HorseAppointmentEntityFilterInput>;
};


/** Represents root query. */
export type RootQueryHorseAppointmentsByLocationDateRangeArgs = {
  endDate: Scalars['DateTime']['input'];
  locationId?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<HorseAppointmentEntitySortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  startDate: Scalars['DateTime']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<HorseAppointmentEntityFilterInput>;
};


/** Represents root query. */
export type RootQueryHorseLocationReportArgs = {
  order?: InputMaybe<Array<HorseLocationReportSortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<HorseLocationReportFilterInput>;
};


/** Represents root query. */
export type RootQueryHorseLocationReportByIdArgs = {
  id: Scalars['Long']['input'];
  order?: InputMaybe<Array<HorseLocationReportSortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<HorseLocationReportFilterInput>;
};


/** Represents root query. */
export type RootQueryHorseTreatmentArgs = {
  order?: InputMaybe<Array<HorseTreatmentSortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<HorseTreatmentFilterInput>;
};


/** Represents root query. */
export type RootQueryHorseTreatmentByIdArgs = {
  id: Scalars['Long']['input'];
  order?: InputMaybe<Array<HorseTreatmentSortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<HorseTreatmentFilterInput>;
};


/** Represents root query. */
export type RootQueryLocationAppointmentArgs = {
  order?: InputMaybe<Array<LocationAppointmentEntitySortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<LocationAppointmentEntityFilterInput>;
};


/** Represents root query. */
export type RootQueryLocationAppointmentByIdArgs = {
  id: Scalars['Int']['input'];
  order?: InputMaybe<Array<LocationAppointmentEntitySortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<LocationAppointmentEntityFilterInput>;
};


/** Represents root query. */
export type RootQueryLocationByIdArgs = {
  id?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<BasicLocationEntitySortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<BasicLocationEntityFilterInput>;
};


/** Represents root query. */
export type RootQueryLocationsArgs = {
  order?: InputMaybe<Array<BasicLocationEntitySortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<BasicLocationEntityFilterInput>;
};


/** Represents root query. */
export type RootQueryPersonScheduleByIdArgs = {
  id: Scalars['Int']['input'];
  order?: InputMaybe<Array<PersonScheduleEntitySortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<PersonScheduleEntityFilterInput>;
};


/** Represents root query. */
export type RootQueryPersonSchedulesArgs = {
  order?: InputMaybe<Array<PersonScheduleEntitySortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<PersonScheduleEntityFilterInput>;
};


/** Represents root query. */
export type RootQueryPostLayoffReportByIdArgs = {
  id?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<PostLayoffReportSortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<PostLayoffReportFilterInput>;
};


/** Represents root query. */
export type RootQueryPostLayoffReportsArgs = {
  order?: InputMaybe<Array<PostLayoffReportSortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<PostLayoffReportFilterInput>;
};


/** Represents root query. */
export type RootQueryRtrReportByIdArgs = {
  id?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<ReadyToRunReportSortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ReadyToRunReportFilterInput>;
};


/** Represents root query. */
export type RootQueryRtrReportsArgs = {
  order?: InputMaybe<Array<ReadyToRunReportSortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ReadyToRunReportFilterInput>;
};


/** Represents root query. */
export type RootQueryRunnersDataArgs = {
  filter: RunnersDataQueryParamsInput;
  order?: InputMaybe<Array<RunnersDataSortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<RunnersDataFilterInput>;
};


/** Represents root query. */
export type RootQueryRunnersDataByIdArgs = {
  id?: InputMaybe<Scalars['String']['input']>;
  timestamp?: InputMaybe<Scalars['String']['input']>;
};


/** Represents root query. */
export type RootQueryRunnersResultArgs = {
  filter: RunnersResultQueryParamsInput;
  order?: InputMaybe<Array<RunnersResultDataSortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<RunnersResultDataFilterInput>;
};


/** Represents root query. */
export type RootQueryRunnersResultByIdArgs = {
  id?: InputMaybe<Scalars['String']['input']>;
  timestamp?: InputMaybe<Scalars['String']['input']>;
};


/** Represents root query. */
export type RootQueryScratchByIdArgs = {
  id?: InputMaybe<Scalars['String']['input']>;
};


/** Represents root query. */
export type RootQueryScratchesArgs = {
  order?: InputMaybe<Array<ScratchSortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ScratchFilterInput>;
};


/** Represents root query. */
export type RootQuerySearchRtrReportsArgs = {
  order?: InputMaybe<Array<ReadyToRunReportSortInput>>;
  searchTerm?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ReadyToRunReportFilterInput>;
};


/** Represents root query. */
export type RootQuerySearchTransportationEventsArgs = {
  id?: InputMaybe<Scalars['Long']['input']>;
  order?: InputMaybe<Array<TransportationEventEntitySortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<TransportationEventEntityFilterInput>;
};


/** Represents root query. */
export type RootQueryTransactionLogByIdArgs = {
  entityId?: InputMaybe<Scalars['String']['input']>;
  timestamp?: InputMaybe<Scalars['String']['input']>;
};


/** Represents root query. */
export type RootQueryTransactionLogsArgs = {
  filter: TransactionLogQueryParamsInput;
  order?: InputMaybe<Array<TransactionLogSortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<TransactionLogFilterInput>;
};


/** Represents root query. */
export type RootQueryTransportationEventAddressByIdArgs = {
  id: Scalars['Long']['input'];
  order?: InputMaybe<Array<TransportationEventAddressEntitySortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<TransportationEventAddressEntityFilterInput>;
};


/** Represents root query. */
export type RootQueryTransportationEventAddressesArgs = {
  order?: InputMaybe<Array<TransportationEventAddressEntitySortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<TransportationEventAddressEntityFilterInput>;
};


/** Represents root query. */
export type RootQueryTransportationEventDetailByIdArgs = {
  id: Scalars['Long']['input'];
  order?: InputMaybe<Array<TransportationEventDetailEntitySortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<TransportationEventDetailEntityFilterInput>;
};


/** Represents root query. */
export type RootQueryTransportationEventDetailsArgs = {
  order?: InputMaybe<Array<TransportationEventDetailEntitySortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<TransportationEventDetailEntityFilterInput>;
};


/** Represents root query. */
export type RootQueryTransportationEventsArgs = {
  order?: InputMaybe<Array<TransportationEventEntitySortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<TransportationEventEntityFilterInput>;
};


/** Represents root query. */
export type RootQueryTreatmentProtocolByIdArgs = {
  id?: InputMaybe<Scalars['String']['input']>;
};


/** Represents root query. */
export type RootQueryTreatmentProtocolsArgs = {
  order?: InputMaybe<Array<TreatmentProtocolSortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<TreatmentProtocolFilterInput>;
};


/** Represents root query. */
export type RootQueryTreatmentTemplateByIdArgs = {
  id?: InputMaybe<Scalars['String']['input']>;
};

/** A segment of a collection. */
export type RtrReportByIdCollectionSegment = {
  __typename?: 'RtrReportByIdCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<ReadyToRunReport>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

export type RtrReportMedicalSummary = {
  __typename?: 'RtrReportMedicalSummary';
  medicalSummary: MedicalSummaryEntity;
  medicalSummaryId: Scalars['Int']['output'];
  report: ReadyToRunReport;
  rtrReportId: Scalars['Int']['output'];
};

export type RtrReportMedicalSummaryFilterInput = {
  and?: InputMaybe<Array<RtrReportMedicalSummaryFilterInput>>;
  medicalSummary?: InputMaybe<MedicalSummaryEntityFilterInput>;
  medicalSummaryId?: InputMaybe<IntOperationFilterInput>;
  or?: InputMaybe<Array<RtrReportMedicalSummaryFilterInput>>;
  report?: InputMaybe<ReadyToRunReportFilterInput>;
  rtrReportId?: InputMaybe<IntOperationFilterInput>;
};

export enum RtrReportStatus {
  AwaitingReply = 'AWAITING_REPLY',
  Completed = 'COMPLETED',
  DateSet = 'DATE_SET',
  Draft = 'DRAFT',
  Expired = 'EXPIRED',
  Failed = 'FAILED',
  Rejected = 'REJECTED',
  Scheduling = 'SCHEDULING',
  Submitted = 'SUBMITTED',
  UnderReview = 'UNDER_REVIEW'
}

export type RtrReportStatusOperationFilterInput = {
  eq?: InputMaybe<RtrReportStatus>;
  in?: InputMaybe<Array<RtrReportStatus>>;
  neq?: InputMaybe<RtrReportStatus>;
  nin?: InputMaybe<Array<RtrReportStatus>>;
};

export enum RtrReportType {
  MandatoryAttendingVetInspection = 'MANDATORY_ATTENDING_VET_INSPECTION',
  PostLayoff = 'POST_LAYOFF',
  Unspecified = 'UNSPECIFIED',
  WorkOffVetList = 'WORK_OFF_VET_LIST'
}

export type RtrReportTypeOperationFilterInput = {
  eq?: InputMaybe<RtrReportType>;
  in?: InputMaybe<Array<RtrReportType>>;
  neq?: InputMaybe<RtrReportType>;
  nin?: InputMaybe<Array<RtrReportType>>;
};

/** A segment of a collection. */
export type RtrReportsCollectionSegment = {
  __typename?: 'RtrReportsCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<ReadyToRunReport>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

export type RunnersData = {
  __typename?: 'RunnersData';
  id: Scalars['String']['output'];
  locked?: Maybe<Scalars['String']['output']>;
  preferredCurrentAsOfIncremental?: Maybe<Scalars['String']['output']>;
  preferredRecType?: Maybe<Scalars['String']['output']>;
  raceBreedTb?: Maybe<Scalars['String']['output']>;
  raceCountry?: Maybe<Scalars['String']['output']>;
  raceDate?: Maybe<Scalars['String']['output']>;
  raceDistanceFurlong?: Maybe<Scalars['String']['output']>;
  raceNumber?: Maybe<Scalars['String']['output']>;
  raceOnTheFlat?: Maybe<Scalars['String']['output']>;
  raceSurface?: Maybe<Scalars['String']['output']>;
  raceSurfaceCondition?: Maybe<Scalars['String']['output']>;
  raceTrackId?: Maybe<Scalars['String']['output']>;
  raceType?: Maybe<Scalars['String']['output']>;
  runnerDNF: Scalars['Boolean']['output'];
  runnerDeath?: Maybe<Scalars['String']['output']>;
  runnerDnf?: Maybe<Scalars['String']['output']>;
  runnerHisaId?: Maybe<Scalars['String']['output']>;
  runnerHorseBreed?: Maybe<Scalars['String']['output']>;
  runnerIncludeInMetricsReport?: Maybe<Scalars['String']['output']>;
  runnerRaceDeath?: Maybe<Scalars['String']['output']>;
  runnerScratched?: Maybe<Scalars['String']['output']>;
  runnerScratched2?: Maybe<Scalars['String']['output']>;
  runnerStart?: Maybe<Scalars['String']['output']>;
  runnerTjcNumber?: Maybe<Scalars['String']['output']>;
  timestampRunnerNumber: Scalars['String']['output'];
};

/** A segment of a collection. */
export type RunnersDataCollectionSegment = {
  __typename?: 'RunnersDataCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<RunnersData>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

export type RunnersDataFilterInput = {
  and?: InputMaybe<Array<RunnersDataFilterInput>>;
  id?: InputMaybe<StringOperationFilterInput>;
  locked?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<RunnersDataFilterInput>>;
  preferredCurrentAsOfIncremental?: InputMaybe<StringOperationFilterInput>;
  preferredRecType?: InputMaybe<StringOperationFilterInput>;
  raceBreedTb?: InputMaybe<StringOperationFilterInput>;
  raceCountry?: InputMaybe<StringOperationFilterInput>;
  raceDate?: InputMaybe<StringOperationFilterInput>;
  raceDistanceFurlong?: InputMaybe<StringOperationFilterInput>;
  raceNumber?: InputMaybe<StringOperationFilterInput>;
  raceOnTheFlat?: InputMaybe<StringOperationFilterInput>;
  raceSurface?: InputMaybe<StringOperationFilterInput>;
  raceSurfaceCondition?: InputMaybe<StringOperationFilterInput>;
  raceTrackId?: InputMaybe<StringOperationFilterInput>;
  raceType?: InputMaybe<StringOperationFilterInput>;
  runnerDNF?: InputMaybe<BooleanOperationFilterInput>;
  runnerDeath?: InputMaybe<StringOperationFilterInput>;
  runnerDnf?: InputMaybe<StringOperationFilterInput>;
  runnerHisaId?: InputMaybe<StringOperationFilterInput>;
  runnerHorseBreed?: InputMaybe<StringOperationFilterInput>;
  runnerIncludeInMetricsReport?: InputMaybe<StringOperationFilterInput>;
  runnerRaceDeath?: InputMaybe<StringOperationFilterInput>;
  runnerScratched?: InputMaybe<StringOperationFilterInput>;
  runnerScratched2?: InputMaybe<StringOperationFilterInput>;
  runnerStart?: InputMaybe<StringOperationFilterInput>;
  runnerTjcNumber?: InputMaybe<StringOperationFilterInput>;
  timestampRunnerNumber?: InputMaybe<StringOperationFilterInput>;
};

export type RunnersDataQueryParamsInput = {
  raceCountry?: InputMaybe<Scalars['String']['input']>;
  raceDate?: InputMaybe<Scalars['String']['input']>;
  raceDistanceFurlong?: InputMaybe<Scalars['String']['input']>;
  raceNumber?: InputMaybe<Scalars['String']['input']>;
  raceSurface?: InputMaybe<Scalars['String']['input']>;
  raceSurfaceCondition?: InputMaybe<Scalars['String']['input']>;
  raceTrackId?: InputMaybe<Scalars['String']['input']>;
  raceType?: InputMaybe<Scalars['String']['input']>;
  runnerHisaId?: InputMaybe<Scalars['String']['input']>;
  runnerHorseBreed?: InputMaybe<Scalars['String']['input']>;
  runnerScratched2?: InputMaybe<Scalars['String']['input']>;
  runnerTjcNumber?: InputMaybe<Scalars['String']['input']>;
};

export type RunnersDataSortInput = {
  id?: InputMaybe<SortEnumType>;
  locked?: InputMaybe<SortEnumType>;
  preferredCurrentAsOfIncremental?: InputMaybe<SortEnumType>;
  preferredRecType?: InputMaybe<SortEnumType>;
  raceBreedTb?: InputMaybe<SortEnumType>;
  raceCountry?: InputMaybe<SortEnumType>;
  raceDate?: InputMaybe<SortEnumType>;
  raceDistanceFurlong?: InputMaybe<SortEnumType>;
  raceNumber?: InputMaybe<SortEnumType>;
  raceOnTheFlat?: InputMaybe<SortEnumType>;
  raceSurface?: InputMaybe<SortEnumType>;
  raceSurfaceCondition?: InputMaybe<SortEnumType>;
  raceTrackId?: InputMaybe<SortEnumType>;
  raceType?: InputMaybe<SortEnumType>;
  runnerDNF?: InputMaybe<SortEnumType>;
  runnerDeath?: InputMaybe<SortEnumType>;
  runnerDnf?: InputMaybe<SortEnumType>;
  runnerHisaId?: InputMaybe<SortEnumType>;
  runnerHorseBreed?: InputMaybe<SortEnumType>;
  runnerIncludeInMetricsReport?: InputMaybe<SortEnumType>;
  runnerRaceDeath?: InputMaybe<SortEnumType>;
  runnerScratched?: InputMaybe<SortEnumType>;
  runnerScratched2?: InputMaybe<SortEnumType>;
  runnerStart?: InputMaybe<SortEnumType>;
  runnerTjcNumber?: InputMaybe<SortEnumType>;
  timestampRunnerNumber?: InputMaybe<SortEnumType>;
};

/** A segment of a collection. */
export type RunnersResultCollectionSegment = {
  __typename?: 'RunnersResultCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<RunnersResultData>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

export type RunnersResultData = {
  __typename?: 'RunnersResultData';
  currentAsOf?: Maybe<Scalars['String']['output']>;
  currentAsOfIncremental: Scalars['Long']['output'];
  hisaCriteriaRace: Scalars['Boolean']['output'];
  id?: Maybe<Scalars['String']['output']>;
  locationId?: Maybe<Scalars['String']['output']>;
  raceClaimingPrice: Scalars['Int']['output'];
  raceCondition?: Maybe<Scalars['String']['output']>;
  raceCountry?: Maybe<Scalars['String']['output']>;
  raceCourse?: Maybe<Scalars['String']['output']>;
  raceDate?: Maybe<Scalars['String']['output']>;
  raceDescription?: Maybe<Scalars['String']['output']>;
  raceDistance?: Maybe<Scalars['String']['output']>;
  raceDistanceFurlong?: Maybe<Scalars['String']['output']>;
  raceDistanceFurlongRound: Scalars['Float']['output'];
  raceFootnote?: Maybe<Scalars['String']['output']>;
  raceOffTime?: Maybe<Scalars['String']['output']>;
  racePostTime?: Maybe<Scalars['String']['output']>;
  racePurse: Scalars['Int']['output'];
  raceRaceNumber: Scalars['Int']['output'];
  raceTrackId?: Maybe<Scalars['String']['output']>;
  raceTrackName?: Maybe<Scalars['String']['output']>;
  raceType?: Maybe<Scalars['String']['output']>;
  starterClaimIndicator?: Maybe<Scalars['String']['output']>;
  starterClaimedPriceUsa?: Maybe<Scalars['String']['output']>;
  starterClaimingPriceWaived?: Maybe<Scalars['String']['output']>;
  starterDnf: Scalars['Boolean']['output'];
  starterEarnings: Scalars['Int']['output'];
  starterHisaRegulated: Scalars['Boolean']['output'];
  starterHorseBreedType?: Maybe<Scalars['String']['output']>;
  starterHorseColor?: Maybe<Scalars['String']['output']>;
  starterHorseDamName?: Maybe<Scalars['String']['output']>;
  starterHorseFoaled?: Maybe<Scalars['String']['output']>;
  starterHorseHisaId?: Maybe<Scalars['String']['output']>;
  starterHorseMicrochips?: Maybe<Scalars['String']['output']>;
  starterHorseName?: Maybe<Scalars['String']['output']>;
  starterHorseReferenceNumber: Scalars['Int']['output'];
  starterHorseRegistry?: Maybe<Scalars['String']['output']>;
  starterHorseSex?: Maybe<Scalars['String']['output']>;
  starterHorseSireName?: Maybe<Scalars['String']['output']>;
  starterHorseTattoo?: Maybe<Scalars['String']['output']>;
  starterJockeyFirstName?: Maybe<Scalars['String']['output']>;
  starterJockeyHisaId?: Maybe<Scalars['String']['output']>;
  starterJockeyLastName?: Maybe<Scalars['String']['output']>;
  starterJockeyReferenceNumber: Scalars['Int']['output'];
  starterJockeyType?: Maybe<Scalars['String']['output']>;
  starterLengthBehindAtFinish: Scalars['Float']['output'];
  starterOdds: Scalars['Float']['output'];
  starterOfficialPosition: Scalars['Int']['output'];
  starterOwnerFirstName?: Maybe<Scalars['String']['output']>;
  starterOwnerHisaId?: Maybe<Scalars['String']['output']>;
  starterOwnerLastName?: Maybe<Scalars['String']['output']>;
  starterOwnerReferenceNumber: Scalars['Int']['output'];
  starterOwnerType?: Maybe<Scalars['String']['output']>;
  starterPositionAtPointOfCall1: Scalars['Int']['output'];
  starterPositionAtPointOfCall2: Scalars['Int']['output'];
  starterPositionAtPointOfCall3: Scalars['Int']['output'];
  starterPositionAtPointOfCall4: Scalars['Int']['output'];
  starterPositionAtPointOfCall5: Scalars['Int']['output'];
  starterPostPosition: Scalars['Int']['output'];
  starterProgramNumber?: Maybe<Scalars['String']['output']>;
  starterRecordType?: Maybe<Scalars['String']['output']>;
  starterScratched: Scalars['Boolean']['output'];
  starterShakes: Scalars['Int']['output'];
  starterTrainerFirstName?: Maybe<Scalars['String']['output']>;
  starterTrainerHisaId?: Maybe<Scalars['String']['output']>;
  starterTrainerLastName?: Maybe<Scalars['String']['output']>;
  starterTrainerReferenceNumber: Scalars['Int']['output'];
  starterTrainerType?: Maybe<Scalars['String']['output']>;
  starterVoidIndicator?: Maybe<Scalars['String']['output']>;
  starterVoidReason?: Maybe<Scalars['String']['output']>;
  timestamp?: Maybe<Scalars['String']['output']>;
};

export type RunnersResultDataFilterInput = {
  and?: InputMaybe<Array<RunnersResultDataFilterInput>>;
  currentAsOf?: InputMaybe<StringOperationFilterInput>;
  currentAsOfIncremental?: InputMaybe<LongOperationFilterInput>;
  hisaCriteriaRace?: InputMaybe<BooleanOperationFilterInput>;
  id?: InputMaybe<StringOperationFilterInput>;
  locationId?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<RunnersResultDataFilterInput>>;
  raceClaimingPrice?: InputMaybe<IntOperationFilterInput>;
  raceCondition?: InputMaybe<StringOperationFilterInput>;
  raceCountry?: InputMaybe<StringOperationFilterInput>;
  raceCourse?: InputMaybe<StringOperationFilterInput>;
  raceDate?: InputMaybe<StringOperationFilterInput>;
  raceDescription?: InputMaybe<StringOperationFilterInput>;
  raceDistance?: InputMaybe<StringOperationFilterInput>;
  raceDistanceFurlong?: InputMaybe<StringOperationFilterInput>;
  raceDistanceFurlongRound?: InputMaybe<FloatOperationFilterInput>;
  raceFootnote?: InputMaybe<StringOperationFilterInput>;
  raceOffTime?: InputMaybe<StringOperationFilterInput>;
  racePostTime?: InputMaybe<StringOperationFilterInput>;
  racePurse?: InputMaybe<IntOperationFilterInput>;
  raceRaceNumber?: InputMaybe<IntOperationFilterInput>;
  raceTrackId?: InputMaybe<StringOperationFilterInput>;
  raceTrackName?: InputMaybe<StringOperationFilterInput>;
  raceType?: InputMaybe<StringOperationFilterInput>;
  starterClaimIndicator?: InputMaybe<StringOperationFilterInput>;
  starterClaimedPriceUsa?: InputMaybe<StringOperationFilterInput>;
  starterClaimingPriceWaived?: InputMaybe<StringOperationFilterInput>;
  starterDnf?: InputMaybe<BooleanOperationFilterInput>;
  starterEarnings?: InputMaybe<IntOperationFilterInput>;
  starterHisaRegulated?: InputMaybe<BooleanOperationFilterInput>;
  starterHorseBreedType?: InputMaybe<StringOperationFilterInput>;
  starterHorseColor?: InputMaybe<StringOperationFilterInput>;
  starterHorseDamName?: InputMaybe<StringOperationFilterInput>;
  starterHorseFoaled?: InputMaybe<StringOperationFilterInput>;
  starterHorseHisaId?: InputMaybe<StringOperationFilterInput>;
  starterHorseMicrochips?: InputMaybe<StringOperationFilterInput>;
  starterHorseName?: InputMaybe<StringOperationFilterInput>;
  starterHorseReferenceNumber?: InputMaybe<IntOperationFilterInput>;
  starterHorseRegistry?: InputMaybe<StringOperationFilterInput>;
  starterHorseSex?: InputMaybe<StringOperationFilterInput>;
  starterHorseSireName?: InputMaybe<StringOperationFilterInput>;
  starterHorseTattoo?: InputMaybe<StringOperationFilterInput>;
  starterJockeyFirstName?: InputMaybe<StringOperationFilterInput>;
  starterJockeyHisaId?: InputMaybe<StringOperationFilterInput>;
  starterJockeyLastName?: InputMaybe<StringOperationFilterInput>;
  starterJockeyReferenceNumber?: InputMaybe<IntOperationFilterInput>;
  starterJockeyType?: InputMaybe<StringOperationFilterInput>;
  starterLengthBehindAtFinish?: InputMaybe<FloatOperationFilterInput>;
  starterOdds?: InputMaybe<FloatOperationFilterInput>;
  starterOfficialPosition?: InputMaybe<IntOperationFilterInput>;
  starterOwnerFirstName?: InputMaybe<StringOperationFilterInput>;
  starterOwnerHisaId?: InputMaybe<StringOperationFilterInput>;
  starterOwnerLastName?: InputMaybe<StringOperationFilterInput>;
  starterOwnerReferenceNumber?: InputMaybe<IntOperationFilterInput>;
  starterOwnerType?: InputMaybe<StringOperationFilterInput>;
  starterPositionAtPointOfCall1?: InputMaybe<IntOperationFilterInput>;
  starterPositionAtPointOfCall2?: InputMaybe<IntOperationFilterInput>;
  starterPositionAtPointOfCall3?: InputMaybe<IntOperationFilterInput>;
  starterPositionAtPointOfCall4?: InputMaybe<IntOperationFilterInput>;
  starterPositionAtPointOfCall5?: InputMaybe<IntOperationFilterInput>;
  starterPostPosition?: InputMaybe<IntOperationFilterInput>;
  starterProgramNumber?: InputMaybe<StringOperationFilterInput>;
  starterRecordType?: InputMaybe<StringOperationFilterInput>;
  starterScratched?: InputMaybe<BooleanOperationFilterInput>;
  starterShakes?: InputMaybe<IntOperationFilterInput>;
  starterTrainerFirstName?: InputMaybe<StringOperationFilterInput>;
  starterTrainerHisaId?: InputMaybe<StringOperationFilterInput>;
  starterTrainerLastName?: InputMaybe<StringOperationFilterInput>;
  starterTrainerReferenceNumber?: InputMaybe<IntOperationFilterInput>;
  starterTrainerType?: InputMaybe<StringOperationFilterInput>;
  starterVoidIndicator?: InputMaybe<StringOperationFilterInput>;
  starterVoidReason?: InputMaybe<StringOperationFilterInput>;
  timestamp?: InputMaybe<StringOperationFilterInput>;
};

export type RunnersResultDataSortInput = {
  currentAsOf?: InputMaybe<SortEnumType>;
  currentAsOfIncremental?: InputMaybe<SortEnumType>;
  hisaCriteriaRace?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  locationId?: InputMaybe<SortEnumType>;
  raceClaimingPrice?: InputMaybe<SortEnumType>;
  raceCondition?: InputMaybe<SortEnumType>;
  raceCountry?: InputMaybe<SortEnumType>;
  raceCourse?: InputMaybe<SortEnumType>;
  raceDate?: InputMaybe<SortEnumType>;
  raceDescription?: InputMaybe<SortEnumType>;
  raceDistance?: InputMaybe<SortEnumType>;
  raceDistanceFurlong?: InputMaybe<SortEnumType>;
  raceDistanceFurlongRound?: InputMaybe<SortEnumType>;
  raceFootnote?: InputMaybe<SortEnumType>;
  raceOffTime?: InputMaybe<SortEnumType>;
  racePostTime?: InputMaybe<SortEnumType>;
  racePurse?: InputMaybe<SortEnumType>;
  raceRaceNumber?: InputMaybe<SortEnumType>;
  raceTrackId?: InputMaybe<SortEnumType>;
  raceTrackName?: InputMaybe<SortEnumType>;
  raceType?: InputMaybe<SortEnumType>;
  starterClaimIndicator?: InputMaybe<SortEnumType>;
  starterClaimedPriceUsa?: InputMaybe<SortEnumType>;
  starterClaimingPriceWaived?: InputMaybe<SortEnumType>;
  starterDnf?: InputMaybe<SortEnumType>;
  starterEarnings?: InputMaybe<SortEnumType>;
  starterHisaRegulated?: InputMaybe<SortEnumType>;
  starterHorseBreedType?: InputMaybe<SortEnumType>;
  starterHorseColor?: InputMaybe<SortEnumType>;
  starterHorseDamName?: InputMaybe<SortEnumType>;
  starterHorseFoaled?: InputMaybe<SortEnumType>;
  starterHorseHisaId?: InputMaybe<SortEnumType>;
  starterHorseMicrochips?: InputMaybe<SortEnumType>;
  starterHorseName?: InputMaybe<SortEnumType>;
  starterHorseReferenceNumber?: InputMaybe<SortEnumType>;
  starterHorseRegistry?: InputMaybe<SortEnumType>;
  starterHorseSex?: InputMaybe<SortEnumType>;
  starterHorseSireName?: InputMaybe<SortEnumType>;
  starterHorseTattoo?: InputMaybe<SortEnumType>;
  starterJockeyFirstName?: InputMaybe<SortEnumType>;
  starterJockeyHisaId?: InputMaybe<SortEnumType>;
  starterJockeyLastName?: InputMaybe<SortEnumType>;
  starterJockeyReferenceNumber?: InputMaybe<SortEnumType>;
  starterJockeyType?: InputMaybe<SortEnumType>;
  starterLengthBehindAtFinish?: InputMaybe<SortEnumType>;
  starterOdds?: InputMaybe<SortEnumType>;
  starterOfficialPosition?: InputMaybe<SortEnumType>;
  starterOwnerFirstName?: InputMaybe<SortEnumType>;
  starterOwnerHisaId?: InputMaybe<SortEnumType>;
  starterOwnerLastName?: InputMaybe<SortEnumType>;
  starterOwnerReferenceNumber?: InputMaybe<SortEnumType>;
  starterOwnerType?: InputMaybe<SortEnumType>;
  starterPositionAtPointOfCall1?: InputMaybe<SortEnumType>;
  starterPositionAtPointOfCall2?: InputMaybe<SortEnumType>;
  starterPositionAtPointOfCall3?: InputMaybe<SortEnumType>;
  starterPositionAtPointOfCall4?: InputMaybe<SortEnumType>;
  starterPositionAtPointOfCall5?: InputMaybe<SortEnumType>;
  starterPostPosition?: InputMaybe<SortEnumType>;
  starterProgramNumber?: InputMaybe<SortEnumType>;
  starterRecordType?: InputMaybe<SortEnumType>;
  starterScratched?: InputMaybe<SortEnumType>;
  starterShakes?: InputMaybe<SortEnumType>;
  starterTrainerFirstName?: InputMaybe<SortEnumType>;
  starterTrainerHisaId?: InputMaybe<SortEnumType>;
  starterTrainerLastName?: InputMaybe<SortEnumType>;
  starterTrainerReferenceNumber?: InputMaybe<SortEnumType>;
  starterTrainerType?: InputMaybe<SortEnumType>;
  starterVoidIndicator?: InputMaybe<SortEnumType>;
  starterVoidReason?: InputMaybe<SortEnumType>;
  timestamp?: InputMaybe<SortEnumType>;
};

export type RunnersResultQueryParamsInput = {
  dateRange?: InputMaybe<DateRangeInput>;
  starterHorseHisaId?: InputMaybe<Scalars['String']['input']>;
  starterHorseName?: InputMaybe<Scalars['String']['input']>;
  starterJockeyHisaId?: InputMaybe<Scalars['String']['input']>;
  starterOwnerHisaId?: InputMaybe<Scalars['String']['input']>;
  starterTrainerHisaId?: InputMaybe<Scalars['String']['input']>;
};

export type Scratch = {
  __typename?: 'Scratch';
  Location?: Maybe<LocationResponse>;
  actualPostPosition: Scalars['Int']['output'];
  calledInBy: CalledInType;
  calledInByDescription?: Maybe<Scalars['String']['output']>;
  cancelReason?: Maybe<Scalars['String']['output']>;
  cancelledAt?: Maybe<Scalars['DateTime']['output']>;
  cancelledByHisaId?: Maybe<Scalars['String']['output']>;
  cancelledByHisaPerson?: Maybe<PersonNameIdModel>;
  createdByHisaId?: Maybe<Scalars['String']['output']>;
  createdDateTime?: Maybe<Scalars['DateTime']['output']>;
  date: Scalars['Date']['output'];
  hisaJockeyId: Scalars['String']['output'];
  hisaStewardId: Scalars['String']['output'];
  horseId: Scalars['String']['output'];
  horseInfo?: Maybe<CoveredHorseExtendedResponse>;
  horseName: Scalars['String']['output'];
  isDeleted?: Maybe<Scalars['Boolean']['output']>;
  jockey: PersonNameIdModel;
  lastUpdatedDateTime?: Maybe<Scalars['DateTime']['output']>;
  locationId: Scalars['String']['output'];
  locationName: Scalars['String']['output'];
  nameOfCaller?: Maybe<Scalars['String']['output']>;
  notes?: Maybe<Scalars['String']['output']>;
  postPosition: Scalars['Int']['output'];
  postedAt?: Maybe<Scalars['DateTime']['output']>;
  programNumber: Scalars['String']['output'];
  raceNumber: Scalars['Int']['output'];
  raceTime: Scalars['DateTime']['output'];
  reasonCode: Scalars['String']['output'];
  responsiblePerson: PersonNameIdModel;
  responsiblePersonId: Scalars['String']['output'];
  scratchDisplayId: Scalars['String']['output'];
  scratchId: Scalars['Int']['output'];
  status: ScratchStatus;
  steward: PersonNameIdModel;
  time: Scalars['TimeSpan']['output'];
  type: ScratchType;
  updatedByHisaId?: Maybe<Scalars['String']['output']>;
};

export type ScratchFilterInput = {
  and?: InputMaybe<Array<ScratchFilterInput>>;
  calledInBy?: InputMaybe<CalledInTypeOperationFilterInput>;
  calledInByDescription?: InputMaybe<StringOperationFilterInput>;
  cancelReason?: InputMaybe<StringOperationFilterInput>;
  cancelledAt?: InputMaybe<DateTimeOperationFilterInput>;
  cancelledByHisaId?: InputMaybe<StringOperationFilterInput>;
  cancelledByHisaPerson?: InputMaybe<PersonNameIdModelFilterInput>;
  createdByHisaId?: InputMaybe<StringOperationFilterInput>;
  createdDateTime?: InputMaybe<DateTimeOperationFilterInput>;
  date?: InputMaybe<DateOperationFilterInput>;
  hisaJockeyId?: InputMaybe<StringOperationFilterInput>;
  hisaStewardId?: InputMaybe<StringOperationFilterInput>;
  horseId?: InputMaybe<StringOperationFilterInput>;
  horseName?: InputMaybe<StringOperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  jockey?: InputMaybe<PersonNameIdModelFilterInput>;
  lastUpdatedDateTime?: InputMaybe<DateTimeOperationFilterInput>;
  locationId?: InputMaybe<StringOperationFilterInput>;
  locationName?: InputMaybe<StringOperationFilterInput>;
  nameOfCaller?: InputMaybe<StringOperationFilterInput>;
  notes?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<ScratchFilterInput>>;
  postPosition?: InputMaybe<IntOperationFilterInput>;
  postedAt?: InputMaybe<DateTimeOperationFilterInput>;
  programNumber?: InputMaybe<StringOperationFilterInput>;
  raceNumber?: InputMaybe<IntOperationFilterInput>;
  raceTime?: InputMaybe<DateTimeOperationFilterInput>;
  reasonCode?: InputMaybe<StringOperationFilterInput>;
  responsiblePerson?: InputMaybe<PersonNameIdModelFilterInput>;
  responsiblePersonId?: InputMaybe<StringOperationFilterInput>;
  scratchDisplayId?: InputMaybe<StringOperationFilterInput>;
  scratchId?: InputMaybe<IntOperationFilterInput>;
  status?: InputMaybe<ScratchStatusOperationFilterInput>;
  steward?: InputMaybe<PersonNameIdModelFilterInput>;
  time?: InputMaybe<TimeSpanOperationFilterInput>;
  type?: InputMaybe<ScratchTypeOperationFilterInput>;
  updatedByHisaId?: InputMaybe<StringOperationFilterInput>;
};

export type ScratchSortInput = {
  calledInBy?: InputMaybe<SortEnumType>;
  calledInByDescription?: InputMaybe<SortEnumType>;
  cancelReason?: InputMaybe<SortEnumType>;
  cancelledAt?: InputMaybe<SortEnumType>;
  cancelledByHisaId?: InputMaybe<SortEnumType>;
  cancelledByHisaPerson?: InputMaybe<PersonNameIdModelSortInput>;
  createdByHisaId?: InputMaybe<SortEnumType>;
  createdDateTime?: InputMaybe<SortEnumType>;
  date?: InputMaybe<SortEnumType>;
  hisaJockeyId?: InputMaybe<SortEnumType>;
  hisaStewardId?: InputMaybe<SortEnumType>;
  horseId?: InputMaybe<SortEnumType>;
  horseName?: InputMaybe<SortEnumType>;
  isDeleted?: InputMaybe<SortEnumType>;
  jockey?: InputMaybe<PersonNameIdModelSortInput>;
  lastUpdatedDateTime?: InputMaybe<SortEnumType>;
  locationId?: InputMaybe<SortEnumType>;
  locationName?: InputMaybe<SortEnumType>;
  nameOfCaller?: InputMaybe<SortEnumType>;
  notes?: InputMaybe<SortEnumType>;
  postPosition?: InputMaybe<SortEnumType>;
  postedAt?: InputMaybe<SortEnumType>;
  programNumber?: InputMaybe<SortEnumType>;
  raceNumber?: InputMaybe<SortEnumType>;
  raceTime?: InputMaybe<SortEnumType>;
  reasonCode?: InputMaybe<SortEnumType>;
  responsiblePerson?: InputMaybe<PersonNameIdModelSortInput>;
  responsiblePersonId?: InputMaybe<SortEnumType>;
  scratchDisplayId?: InputMaybe<SortEnumType>;
  scratchId?: InputMaybe<SortEnumType>;
  status?: InputMaybe<SortEnumType>;
  steward?: InputMaybe<PersonNameIdModelSortInput>;
  time?: InputMaybe<SortEnumType>;
  type?: InputMaybe<SortEnumType>;
  updatedByHisaId?: InputMaybe<SortEnumType>;
};

export enum ScratchStatus {
  Cancelled = 'CANCELLED',
  NotPosted = 'NOT_POSTED',
  Posted = 'POSTED'
}

export type ScratchStatusOperationFilterInput = {
  eq?: InputMaybe<ScratchStatus>;
  in?: InputMaybe<Array<ScratchStatus>>;
  neq?: InputMaybe<ScratchStatus>;
  nin?: InputMaybe<Array<ScratchStatus>>;
};

export enum ScratchType {
  Early = 'EARLY',
  Late = 'LATE'
}

export type ScratchTypeOperationFilterInput = {
  eq?: InputMaybe<ScratchType>;
  in?: InputMaybe<Array<ScratchType>>;
  neq?: InputMaybe<ScratchType>;
  nin?: InputMaybe<Array<ScratchType>>;
};

/** A segment of a collection. */
export type ScratchesCollectionSegment = {
  __typename?: 'ScratchesCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<Scratch>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

/** A segment of a collection. */
export type SearchRtrReportsCollectionSegment = {
  __typename?: 'SearchRtrReportsCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<ReadyToRunReport>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

/** A segment of a collection. */
export type SearchTransportationEventsCollectionSegment = {
  __typename?: 'SearchTransportationEventsCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<TransportationEventEntity>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

export enum SortEnumType {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type StringOperationFilterInput = {
  and?: InputMaybe<Array<StringOperationFilterInput>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  eq?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  ncontains?: InputMaybe<Scalars['String']['input']>;
  nendsWith?: InputMaybe<Scalars['String']['input']>;
  neq?: InputMaybe<Scalars['String']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  nstartsWith?: InputMaybe<Scalars['String']['input']>;
  or?: InputMaybe<Array<StringOperationFilterInput>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type TimeSpanOperationFilterInput = {
  eq?: InputMaybe<Scalars['TimeSpan']['input']>;
  gt?: InputMaybe<Scalars['TimeSpan']['input']>;
  gte?: InputMaybe<Scalars['TimeSpan']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['TimeSpan']['input']>>>;
  lt?: InputMaybe<Scalars['TimeSpan']['input']>;
  lte?: InputMaybe<Scalars['TimeSpan']['input']>;
  neq?: InputMaybe<Scalars['TimeSpan']['input']>;
  ngt?: InputMaybe<Scalars['TimeSpan']['input']>;
  ngte?: InputMaybe<Scalars['TimeSpan']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['TimeSpan']['input']>>>;
  nlt?: InputMaybe<Scalars['TimeSpan']['input']>;
  nlte?: InputMaybe<Scalars['TimeSpan']['input']>;
};

export type TransactionLog = {
  __typename?: 'TransactionLog';
  action: Scalars['String']['output'];
  activity: RecordActivity;
  complete: Scalars['Boolean']['output'];
  date: Scalars['Date']['output'];
  details?: Maybe<Scalars['String']['output']>;
  entityId: Scalars['String']['output'];
  messageId?: Maybe<Scalars['String']['output']>;
  status: TransactionLogStatus;
  timestamp: Scalars['String']['output'];
  transactionId: Scalars['String']['output'];
  treatmentRecordId?: Maybe<Scalars['String']['output']>;
};

export type TransactionLogFilterInput = {
  action?: InputMaybe<StringOperationFilterInput>;
  activity?: InputMaybe<RecordActivityFilterInput>;
  and?: InputMaybe<Array<TransactionLogFilterInput>>;
  complete?: InputMaybe<BooleanOperationFilterInput>;
  date?: InputMaybe<DateOperationFilterInput>;
  details?: InputMaybe<StringOperationFilterInput>;
  entityId?: InputMaybe<StringOperationFilterInput>;
  messageId?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<TransactionLogFilterInput>>;
  status?: InputMaybe<TransactionLogStatusOperationFilterInput>;
  timestamp?: InputMaybe<StringOperationFilterInput>;
  transactionId?: InputMaybe<StringOperationFilterInput>;
  treatmentRecordId?: InputMaybe<StringOperationFilterInput>;
  uniqueId?: InputMaybe<StringOperationFilterInput>;
  uuid?: InputMaybe<StringOperationFilterInput>;
};

export type TransactionLogQueryParamsInput = {
  dateRange?: InputMaybe<DateRangeInput>;
  entityId?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<TransactionLogStatus>;
  treatmentRecordId?: InputMaybe<Scalars['String']['input']>;
};

export type TransactionLogSortInput = {
  action?: InputMaybe<SortEnumType>;
  activity?: InputMaybe<RecordActivitySortInput>;
  complete?: InputMaybe<SortEnumType>;
  date?: InputMaybe<SortEnumType>;
  details?: InputMaybe<SortEnumType>;
  entityId?: InputMaybe<SortEnumType>;
  messageId?: InputMaybe<SortEnumType>;
  status?: InputMaybe<SortEnumType>;
  timestamp?: InputMaybe<SortEnumType>;
  transactionId?: InputMaybe<SortEnumType>;
  treatmentRecordId?: InputMaybe<SortEnumType>;
  uniqueId?: InputMaybe<SortEnumType>;
  uuid?: InputMaybe<SortEnumType>;
};

export enum TransactionLogStatus {
  ConfirmedChangesMade = 'CONFIRMED_CHANGES_MADE',
  ConfirmedNoChangesMade = 'CONFIRMED_NO_CHANGES_MADE',
  MessageRead = 'MESSAGE_READ',
  MessageRecalled = 'MESSAGE_RECALLED',
  MessageRecieved = 'MESSAGE_RECIEVED',
  MessageSent = 'MESSAGE_SENT',
  NotConfirmedSkippedByHuman = 'NOT_CONFIRMED_SKIPPED_BY_HUMAN',
  NotConfirmedTimedOut = 'NOT_CONFIRMED_TIMED_OUT',
  NoResponseTimedOut = 'NO_RESPONSE_TIMED_OUT',
  RecordModified = 'RECORD_MODIFIED',
  ResubmittedForProcessing = 'RESUBMITTED_FOR_PROCESSING',
  WaitingForHuman = 'WAITING_FOR_HUMAN',
  WaitingForInformation = 'WAITING_FOR_INFORMATION',
  WaitingForResponse = 'WAITING_FOR_RESPONSE'
}

export type TransactionLogStatusOperationFilterInput = {
  eq?: InputMaybe<TransactionLogStatus>;
  in?: InputMaybe<Array<TransactionLogStatus>>;
  neq?: InputMaybe<TransactionLogStatus>;
  nin?: InputMaybe<Array<TransactionLogStatus>>;
};

/** A segment of a collection. */
export type TransactionLogsCollectionSegment = {
  __typename?: 'TransactionLogsCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<TransactionLog>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

export enum TransportationAddressRole {
  Current = 'CURRENT',
  Destination = 'DESTINATION',
  Origin = 'ORIGIN'
}

export type TransportationAddressRoleOperationFilterInput = {
  eq?: InputMaybe<TransportationAddressRole>;
  in?: InputMaybe<Array<TransportationAddressRole>>;
  neq?: InputMaybe<TransportationAddressRole>;
  nin?: InputMaybe<Array<TransportationAddressRole>>;
};

/** A segment of a collection. */
export type TransportationEventAddressByIdCollectionSegment = {
  __typename?: 'TransportationEventAddressByIdCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<TransportationEventAddressEntity>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

export type TransportationEventAddressEntity = {
  __typename?: 'TransportationEventAddressEntity';
  city: Scalars['String']['output'];
  country: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  event: TransportationEventEntity;
  eventId: Scalars['Long']['output'];
  role: TransportationAddressRole;
  state: Scalars['String']['output'];
  street: Scalars['String']['output'];
  transportationEventAddressId: Scalars['Long']['output'];
  unitAptBoxNumber?: Maybe<Scalars['String']['output']>;
  zipPostalCode?: Maybe<Scalars['String']['output']>;
};

export type TransportationEventAddressEntityFilterInput = {
  and?: InputMaybe<Array<TransportationEventAddressEntityFilterInput>>;
  city?: InputMaybe<StringOperationFilterInput>;
  country?: InputMaybe<StringOperationFilterInput>;
  createdAt?: InputMaybe<DateTimeOperationFilterInput>;
  event?: InputMaybe<TransportationEventEntityFilterInput>;
  eventId?: InputMaybe<LongOperationFilterInput>;
  or?: InputMaybe<Array<TransportationEventAddressEntityFilterInput>>;
  role?: InputMaybe<TransportationAddressRoleOperationFilterInput>;
  state?: InputMaybe<StringOperationFilterInput>;
  street?: InputMaybe<StringOperationFilterInput>;
  transportationEventAddressId?: InputMaybe<LongOperationFilterInput>;
  unitAptBoxNumber?: InputMaybe<StringOperationFilterInput>;
  zipPostalCode?: InputMaybe<StringOperationFilterInput>;
};

export type TransportationEventAddressEntitySortInput = {
  city?: InputMaybe<SortEnumType>;
  country?: InputMaybe<SortEnumType>;
  createdAt?: InputMaybe<SortEnumType>;
  event?: InputMaybe<TransportationEventEntitySortInput>;
  eventId?: InputMaybe<SortEnumType>;
  role?: InputMaybe<SortEnumType>;
  state?: InputMaybe<SortEnumType>;
  street?: InputMaybe<SortEnumType>;
  transportationEventAddressId?: InputMaybe<SortEnumType>;
  unitAptBoxNumber?: InputMaybe<SortEnumType>;
  zipPostalCode?: InputMaybe<SortEnumType>;
};

/** A segment of a collection. */
export type TransportationEventAddressesCollectionSegment = {
  __typename?: 'TransportationEventAddressesCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<TransportationEventAddressEntity>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

/** A segment of a collection. */
export type TransportationEventDetailByIdCollectionSegment = {
  __typename?: 'TransportationEventDetailByIdCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<TransportationEventDetailEntity>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

export type TransportationEventDetailEntity = {
  __typename?: 'TransportationEventDetailEntity';
  contactPersonPhone?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  currentGeoLocation?: Maybe<GeoJsonPointType>;
  currentLocationId?: Maybe<Scalars['String']['output']>;
  destinationGeoLocation?: Maybe<GeoJsonPointType>;
  destinationLocationId?: Maybe<Scalars['String']['output']>;
  driverName?: Maybe<Scalars['String']['output']>;
  event: TransportationEventEntity;
  eventId: Scalars['Long']['output'];
  hisaDriverId?: Maybe<Scalars['String']['output']>;
  hisaPersonId?: Maybe<Scalars['String']['output']>;
  incidentDescription?: Maybe<Scalars['String']['output']>;
  licPicId?: Maybe<Scalars['String']['output']>;
  licensePlate?: Maybe<Scalars['String']['output']>;
  microchipVerificationData?: Maybe<Scalars['String']['output']>;
  notes?: Maybe<Scalars['String']['output']>;
  originGeoLocation?: Maybe<GeoJsonPointType>;
  originLocationId?: Maybe<Scalars['String']['output']>;
  otherReasonDescription?: Maybe<Scalars['String']['output']>;
  relocationReason?: Maybe<RelocationReason>;
  transportCompanyName?: Maybe<Scalars['String']['output']>;
  transportationEventDetailId: Scalars['Long']['output'];
  tripType?: Maybe<TripType>;
};

export type TransportationEventDetailEntityFilterInput = {
  and?: InputMaybe<Array<TransportationEventDetailEntityFilterInput>>;
  contactPersonPhone?: InputMaybe<StringOperationFilterInput>;
  createdAt?: InputMaybe<DateTimeOperationFilterInput>;
  currentGeoLocation?: InputMaybe<PointFilterInput>;
  currentLocationId?: InputMaybe<StringOperationFilterInput>;
  destinationGeoLocation?: InputMaybe<PointFilterInput>;
  destinationLocationId?: InputMaybe<StringOperationFilterInput>;
  driverName?: InputMaybe<StringOperationFilterInput>;
  event?: InputMaybe<TransportationEventEntityFilterInput>;
  eventId?: InputMaybe<LongOperationFilterInput>;
  hisaDriverId?: InputMaybe<StringOperationFilterInput>;
  hisaPersonId?: InputMaybe<StringOperationFilterInput>;
  incidentDescription?: InputMaybe<StringOperationFilterInput>;
  licPicId?: InputMaybe<StringOperationFilterInput>;
  licensePlate?: InputMaybe<StringOperationFilterInput>;
  microchipVerificationData?: InputMaybe<StringOperationFilterInput>;
  notes?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<TransportationEventDetailEntityFilterInput>>;
  originGeoLocation?: InputMaybe<PointFilterInput>;
  originLocationId?: InputMaybe<StringOperationFilterInput>;
  otherReasonDescription?: InputMaybe<StringOperationFilterInput>;
  relocationReason?: InputMaybe<NullableOfRelocationReasonOperationFilterInput>;
  transportCompanyName?: InputMaybe<StringOperationFilterInput>;
  transportationEventDetailId?: InputMaybe<LongOperationFilterInput>;
  tripType?: InputMaybe<NullableOfTripTypeOperationFilterInput>;
};

export type TransportationEventDetailEntitySortInput = {
  contactPersonPhone?: InputMaybe<SortEnumType>;
  createdAt?: InputMaybe<SortEnumType>;
  currentGeoLocation?: InputMaybe<PointSortInput>;
  currentLocationId?: InputMaybe<SortEnumType>;
  destinationGeoLocation?: InputMaybe<PointSortInput>;
  destinationLocationId?: InputMaybe<SortEnumType>;
  driverName?: InputMaybe<SortEnumType>;
  event?: InputMaybe<TransportationEventEntitySortInput>;
  eventId?: InputMaybe<SortEnumType>;
  hisaDriverId?: InputMaybe<SortEnumType>;
  hisaPersonId?: InputMaybe<SortEnumType>;
  incidentDescription?: InputMaybe<SortEnumType>;
  licPicId?: InputMaybe<SortEnumType>;
  licensePlate?: InputMaybe<SortEnumType>;
  microchipVerificationData?: InputMaybe<SortEnumType>;
  notes?: InputMaybe<SortEnumType>;
  originGeoLocation?: InputMaybe<PointSortInput>;
  originLocationId?: InputMaybe<SortEnumType>;
  otherReasonDescription?: InputMaybe<SortEnumType>;
  relocationReason?: InputMaybe<SortEnumType>;
  transportCompanyName?: InputMaybe<SortEnumType>;
  transportationEventDetailId?: InputMaybe<SortEnumType>;
  tripType?: InputMaybe<SortEnumType>;
};

/** A segment of a collection. */
export type TransportationEventDetailsCollectionSegment = {
  __typename?: 'TransportationEventDetailsCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<TransportationEventDetailEntity>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

export type TransportationEventEntity = {
  __typename?: 'TransportationEventEntity';
  addresses?: Maybe<Array<TransportationEventAddressEntity>>;
  createdAt: Scalars['DateTime']['output'];
  createdBy: Scalars['String']['output'];
  details?: Maybe<TransportationEventDetailEntity>;
  eventId: Scalars['Long']['output'];
  eventType: TransportationEventType;
  horses: Array<TransportationEventHorseEntity>;
  sourceId: Scalars['String']['output'];
  sourceKind: Scalars['String']['output'];
  status: TransportationStatus;
  timestamp: Scalars['DateTime']['output'];
};

export type TransportationEventEntityFilterInput = {
  addresses?: InputMaybe<ListFilterInputTypeOfTransportationEventAddressEntityFilterInput>;
  and?: InputMaybe<Array<TransportationEventEntityFilterInput>>;
  createdAt?: InputMaybe<DateTimeOperationFilterInput>;
  createdBy?: InputMaybe<StringOperationFilterInput>;
  details?: InputMaybe<TransportationEventDetailEntityFilterInput>;
  eventId?: InputMaybe<LongOperationFilterInput>;
  eventType?: InputMaybe<TransportationEventTypeOperationFilterInput>;
  horses?: InputMaybe<ListFilterInputTypeOfTransportationEventHorseEntityFilterInput>;
  or?: InputMaybe<Array<TransportationEventEntityFilterInput>>;
  sourceId?: InputMaybe<StringOperationFilterInput>;
  sourceKind?: InputMaybe<StringOperationFilterInput>;
  status?: InputMaybe<TransportationStatusOperationFilterInput>;
  timestamp?: InputMaybe<DateTimeOperationFilterInput>;
};

export type TransportationEventEntitySortInput = {
  createdAt?: InputMaybe<SortEnumType>;
  createdBy?: InputMaybe<SortEnumType>;
  details?: InputMaybe<TransportationEventDetailEntitySortInput>;
  eventId?: InputMaybe<SortEnumType>;
  eventType?: InputMaybe<SortEnumType>;
  sourceId?: InputMaybe<SortEnumType>;
  sourceKind?: InputMaybe<SortEnumType>;
  status?: InputMaybe<SortEnumType>;
  timestamp?: InputMaybe<SortEnumType>;
};

export type TransportationEventHorseEntity = {
  __typename?: 'TransportationEventHorseEntity';
  createdAt: Scalars['DateTime']['output'];
  event: TransportationEventEntity;
  eventId: Scalars['Long']['output'];
  hisaHorseId: Scalars['String']['output'];
  horse?: Maybe<BasicHorse>;
  transportationEventHorseId: Scalars['Long']['output'];
};

export type TransportationEventHorseEntityFilterInput = {
  and?: InputMaybe<Array<TransportationEventHorseEntityFilterInput>>;
  createdAt?: InputMaybe<DateTimeOperationFilterInput>;
  event?: InputMaybe<TransportationEventEntityFilterInput>;
  eventId?: InputMaybe<LongOperationFilterInput>;
  hisaHorseId?: InputMaybe<StringOperationFilterInput>;
  horse?: InputMaybe<BasicHorseFilterInput>;
  or?: InputMaybe<Array<TransportationEventHorseEntityFilterInput>>;
  transportationEventHorseId?: InputMaybe<LongOperationFilterInput>;
};

export enum TransportationEventType {
  Arrival = 'ARRIVAL',
  Drive = 'DRIVE',
  Pickup = 'PICKUP'
}

export type TransportationEventTypeOperationFilterInput = {
  eq?: InputMaybe<TransportationEventType>;
  in?: InputMaybe<Array<TransportationEventType>>;
  neq?: InputMaybe<TransportationEventType>;
  nin?: InputMaybe<Array<TransportationEventType>>;
};

/** A segment of a collection. */
export type TransportationEventsCollectionSegment = {
  __typename?: 'TransportationEventsCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<TransportationEventEntity>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

export enum TransportationStatus {
  Closed = 'CLOSED',
  Finished = 'FINISHED',
  InProgress = 'IN_PROGRESS',
  New = 'NEW'
}

export type TransportationStatusOperationFilterInput = {
  eq?: InputMaybe<TransportationStatus>;
  in?: InputMaybe<Array<TransportationStatus>>;
  neq?: InputMaybe<TransportationStatus>;
  nin?: InputMaybe<Array<TransportationStatus>>;
};

export type TreatmentProtocol = {
  __typename?: 'TreatmentProtocol';
  createdDateTime?: Maybe<Scalars['DateTime']['output']>;
  externalTreatmentProtocolId: Scalars['String']['output'];
  isDeleted?: Maybe<Scalars['Boolean']['output']>;
  isPublic: Scalars['Boolean']['output'];
  lastUpdatedDateTime?: Maybe<Scalars['DateTime']['output']>;
  personId: Scalars['String']['output'];
  protocolName?: Maybe<Scalars['String']['output']>;
  treatments: Array<TreatmentTemplate>;
};

export type TreatmentProtocolFilterInput = {
  and?: InputMaybe<Array<TreatmentProtocolFilterInput>>;
  createdDateTime?: InputMaybe<DateTimeOperationFilterInput>;
  externalTreatmentProtocolId?: InputMaybe<StringOperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  isPublic?: InputMaybe<BooleanOperationFilterInput>;
  lastUpdatedDateTime?: InputMaybe<DateTimeOperationFilterInput>;
  or?: InputMaybe<Array<TreatmentProtocolFilterInput>>;
  personId?: InputMaybe<StringOperationFilterInput>;
  protocolName?: InputMaybe<StringOperationFilterInput>;
  treatmentProtocolId?: InputMaybe<IntOperationFilterInput>;
  treatments?: InputMaybe<ListFilterInputTypeOfTreatmentTemplateFilterInput>;
};

export type TreatmentProtocolSortInput = {
  createdDateTime?: InputMaybe<SortEnumType>;
  externalTreatmentProtocolId?: InputMaybe<SortEnumType>;
  isDeleted?: InputMaybe<SortEnumType>;
  isPublic?: InputMaybe<SortEnumType>;
  lastUpdatedDateTime?: InputMaybe<SortEnumType>;
  personId?: InputMaybe<SortEnumType>;
  protocolName?: InputMaybe<SortEnumType>;
  treatmentProtocolId?: InputMaybe<SortEnumType>;
};

/** A segment of a collection. */
export type TreatmentProtocolsCollectionSegment = {
  __typename?: 'TreatmentProtocolsCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<TreatmentProtocol>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

export type TreatmentRecordPeople = {
  __typename?: 'TreatmentRecordPeople';
  attendingVets: Array<Scalars['String']['output']>;
  designatedOwner: Scalars['String']['output'];
  drugDispensedTo: Scalars['String']['output'];
  drugPrescribingVet: Scalars['String']['output'];
  regulatoryVet: Scalars['String']['output'];
  reportingPerson: Scalars['String']['output'];
  requestingVet: Scalars['String']['output'];
  responsiblePerson: Scalars['String']['output'];
  specialist: Scalars['String']['output'];
  surgeon: Scalars['String']['output'];
  treatingPerson: Scalars['String']['output'];
};

export type TreatmentRecordPeopleFilterInput = {
  and?: InputMaybe<Array<TreatmentRecordPeopleFilterInput>>;
  attendingVets?: InputMaybe<ListStringOperationFilterInput>;
  designatedOwner?: InputMaybe<StringOperationFilterInput>;
  drugDispensedTo?: InputMaybe<StringOperationFilterInput>;
  drugPrescribingVet?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<TreatmentRecordPeopleFilterInput>>;
  regulatoryVet?: InputMaybe<StringOperationFilterInput>;
  reportingPerson?: InputMaybe<StringOperationFilterInput>;
  requestingVet?: InputMaybe<StringOperationFilterInput>;
  responsiblePerson?: InputMaybe<StringOperationFilterInput>;
  specialist?: InputMaybe<StringOperationFilterInput>;
  surgeon?: InputMaybe<StringOperationFilterInput>;
  treatingPerson?: InputMaybe<StringOperationFilterInput>;
};

export type TreatmentRecordPeopleSortInput = {
  designatedOwner?: InputMaybe<SortEnumType>;
  drugDispensedTo?: InputMaybe<SortEnumType>;
  drugPrescribingVet?: InputMaybe<SortEnumType>;
  regulatoryVet?: InputMaybe<SortEnumType>;
  reportingPerson?: InputMaybe<SortEnumType>;
  requestingVet?: InputMaybe<SortEnumType>;
  responsiblePerson?: InputMaybe<SortEnumType>;
  specialist?: InputMaybe<SortEnumType>;
  surgeon?: InputMaybe<SortEnumType>;
  treatingPerson?: InputMaybe<SortEnumType>;
};

export type TreatmentTemplate = {
  __typename?: 'TreatmentTemplate';
  category?: Maybe<Scalars['String']['output']>;
  chiropractic?: Maybe<Scalars['String']['output']>;
  classifiedAs?: Maybe<Scalars['String']['output']>;
  clearedToRace: Scalars['Boolean']['output'];
  clearedToWork: Scalars['Boolean']['output'];
  conditionTreated?: Maybe<Scalars['String']['output']>;
  dental?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  drugDosage?: Maybe<Scalars['String']['output']>;
  drugName?: Maybe<Scalars['String']['output']>;
  drugRoute: HorseMedicalRouteAdmin;
  externalTreatmentProtocolId: Scalars['String']['output'];
  externalTreatmentTemplateId: Scalars['String']['output'];
  internalNotes?: Maybe<Scalars['String']['output']>;
  isDeleted?: Maybe<Scalars['Boolean']['output']>;
  limbTreated?: Maybe<Scalars['String']['output']>;
  modality?: Maybe<Scalars['String']['output']>;
  notes?: Maybe<Scalars['String']['output']>;
  physiotherapy?: Maybe<Scalars['String']['output']>;
  procedure?: Maybe<Scalars['String']['output']>;
  recType?: Maybe<HorseMedicalRecType>;
  structure?: Maybe<Scalars['String']['output']>;
  surgery?: Maybe<Scalars['String']['output']>;
  testName?: Maybe<Scalars['String']['output']>;
  testResults?: Maybe<Scalars['String']['output']>;
  treatmentProtocol: TreatmentProtocol;
  vaccine?: Maybe<Scalars['String']['output']>;
};

export type TreatmentTemplateFilterInput = {
  and?: InputMaybe<Array<TreatmentTemplateFilterInput>>;
  category?: InputMaybe<StringOperationFilterInput>;
  chiropractic?: InputMaybe<StringOperationFilterInput>;
  classifiedAs?: InputMaybe<StringOperationFilterInput>;
  clearedToRace?: InputMaybe<BooleanOperationFilterInput>;
  clearedToWork?: InputMaybe<BooleanOperationFilterInput>;
  conditionTreated?: InputMaybe<StringOperationFilterInput>;
  dental?: InputMaybe<StringOperationFilterInput>;
  description?: InputMaybe<StringOperationFilterInput>;
  drugDosage?: InputMaybe<StringOperationFilterInput>;
  drugName?: InputMaybe<StringOperationFilterInput>;
  drugRoute?: InputMaybe<HorseMedicalRouteAdminOperationFilterInput>;
  externalTreatmentProtocolId?: InputMaybe<StringOperationFilterInput>;
  externalTreatmentTemplateId?: InputMaybe<StringOperationFilterInput>;
  internalNotes?: InputMaybe<StringOperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  limbTreated?: InputMaybe<StringOperationFilterInput>;
  modality?: InputMaybe<StringOperationFilterInput>;
  notes?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<TreatmentTemplateFilterInput>>;
  physiotherapy?: InputMaybe<StringOperationFilterInput>;
  procedure?: InputMaybe<StringOperationFilterInput>;
  recType?: InputMaybe<NullableOfHorseMedicalRecTypeOperationFilterInput>;
  structure?: InputMaybe<StringOperationFilterInput>;
  surgery?: InputMaybe<StringOperationFilterInput>;
  testName?: InputMaybe<StringOperationFilterInput>;
  testResults?: InputMaybe<StringOperationFilterInput>;
  treatmentProtocol?: InputMaybe<TreatmentProtocolFilterInput>;
  treatmentProtocolId?: InputMaybe<IntOperationFilterInput>;
  treatmentTemplateId?: InputMaybe<IntOperationFilterInput>;
  vaccine?: InputMaybe<StringOperationFilterInput>;
};

export enum TripType {
  OneWay = 'ONE_WAY',
  RoundTrip = 'ROUND_TRIP'
}

export enum VetsListReason {
  Admin = 'ADMIN',
  ClenbuterolOrVentipulmin = 'CLENBUTEROL_OR_VENTIPULMIN',
  Epistaxis = 'EPISTAXIS',
  ExhaustedHeatStroke = 'EXHAUSTED_HEAT_STROKE',
  Illness = 'ILLNESS',
  Injured = 'INJURED',
  IntraArticularInjection = 'INTRA_ARTICULAR_INJECTION',
  IntraArticularInjectionFetlockJoint = 'INTRA_ARTICULAR_INJECTION_FETLOCK_JOINT',
  IntraArticularInjectionWithPaag = 'INTRA_ARTICULAR_INJECTION_WITH_PAAG',
  LastStartGt365 = 'LAST_START_GT365',
  MedicallyCompromised = 'MEDICALLY_COMPROMISED',
  NoStartsBefore4YearOld = 'NO_STARTS_BEFORE4_YEAR_OLD',
  Other = 'OTHER',
  PhysicallyDistressed = 'PHYSICALLY_DISTRESSED',
  PositiveTestOrOverage = 'POSITIVE_TEST_OR_OVERAGE',
  Shockwave = 'SHOCKWAVE',
  Unknown = 'UNKNOWN',
  Unsoundness = 'UNSOUNDNESS'
}

export type TreatmentProtocolByIdQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type TreatmentProtocolByIdQuery = { __typename?: 'RootQuery', treatmentProtocolById?: { __typename?: 'TreatmentProtocol', externalTreatmentProtocolId: string, personId: string, protocolName?: string | null, isPublic: boolean, createdDateTime?: any | null, lastUpdatedDateTime?: any | null, isDeleted?: boolean | null, treatments: Array<{ __typename?: 'TreatmentTemplate', externalTreatmentTemplateId: string, externalTreatmentProtocolId: string, clearedToWork: boolean, clearedToRace: boolean, recType?: HorseMedicalRecType | null, vaccine?: string | null, drugName?: string | null, drugRoute: HorseMedicalRouteAdmin, drugDosage?: string | null, procedure?: string | null, surgery?: string | null, dental?: string | null, physiotherapy?: string | null, chiropractic?: string | null, conditionTreated?: string | null, modality?: string | null, testName?: string | null, testResults?: string | null, limbTreated?: string | null, notes?: string | null, structure?: string | null, description?: string | null, classifiedAs?: string | null, category?: string | null, internalNotes?: string | null, isDeleted?: boolean | null }> } | null };

export type TreatmentProtocolsQueryVariables = Exact<{
  personId: Scalars['String']['input'];
}>;


export type TreatmentProtocolsQuery = { __typename?: 'RootQuery', treatmentProtocols?: { __typename?: 'TreatmentProtocolsCollectionSegment', items?: Array<{ __typename?: 'TreatmentProtocol', externalTreatmentProtocolId: string, personId: string, protocolName?: string | null, isPublic: boolean, createdDateTime?: any | null, lastUpdatedDateTime?: any | null, isDeleted?: boolean | null, treatments: Array<{ __typename?: 'TreatmentTemplate', externalTreatmentTemplateId: string, externalTreatmentProtocolId: string, clearedToWork: boolean, clearedToRace: boolean, recType?: HorseMedicalRecType | null, vaccine?: string | null, drugName?: string | null, drugRoute: HorseMedicalRouteAdmin, drugDosage?: string | null, procedure?: string | null, surgery?: string | null, dental?: string | null, physiotherapy?: string | null, chiropractic?: string | null, conditionTreated?: string | null, modality?: string | null, testName?: string | null, testResults?: string | null, limbTreated?: string | null, notes?: string | null, structure?: string | null, description?: string | null, classifiedAs?: string | null, category?: string | null, internalNotes?: string | null, isDeleted?: boolean | null }> } | null> | null } | null };

export type RunnersQueryQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  filter: RunnersDataQueryParamsInput;
  where?: InputMaybe<RunnersDataFilterInput>;
  order?: InputMaybe<Array<RunnersDataSortInput> | RunnersDataSortInput>;
}>;


export type RunnersQueryQuery = { __typename?: 'RootQuery', runnersData?: { __typename?: 'RunnersDataCollectionSegment', totalCount: number, items?: Array<{ __typename?: 'RunnersData', id: string, timestampRunnerNumber: string, runnerDeath?: string | null, runnerDNF: boolean, runnerRaceDeath?: string | null, runnerScratched?: string | null, runnerStart?: string | null, locked?: string | null, preferredCurrentAsOfIncremental?: string | null, preferredRecType?: string | null, raceBreedTb?: string | null, raceCountry?: string | null, raceDate?: string | null, raceDistanceFurlong?: string | null, raceNumber?: string | null, raceOnTheFlat?: string | null, raceSurface?: string | null, raceSurfaceCondition?: string | null, raceTrackId?: string | null, raceType?: string | null, runnerDnf?: string | null, runnerHisaId?: string | null, runnerHorseBreed?: string | null, runnerIncludeInMetricsReport?: string | null, runnerScratched2?: string | null, runnerTjcNumber?: string | null } | null> | null } | null };

export type RunnersResultQueryQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  filter: RunnersResultQueryParamsInput;
  where?: InputMaybe<RunnersResultDataFilterInput>;
  order?: InputMaybe<Array<RunnersResultDataSortInput> | RunnersResultDataSortInput>;
}>;


export type RunnersResultQueryQuery = { __typename?: 'RootQuery', runnersResult?: { __typename?: 'RunnersResultCollectionSegment', totalCount: number, items?: Array<{ __typename?: 'RunnersResultData', id?: string | null, timestamp?: string | null, currentAsOf?: string | null, currentAsOfIncremental: any, hisaCriteriaRace: boolean, locationId?: string | null, raceClaimingPrice: number, raceCondition?: string | null, raceCountry?: string | null, raceCourse?: string | null, raceDate?: string | null, raceDescription?: string | null, raceDistance?: string | null, raceDistanceFurlong?: string | null, raceDistanceFurlongRound: number, raceFootnote?: string | null, raceOffTime?: string | null, racePostTime?: string | null, racePurse: number, raceRaceNumber: number, raceTrackId?: string | null, raceTrackName?: string | null, raceType?: string | null, starterClaimedPriceUsa?: string | null, starterClaimIndicator?: string | null, starterClaimingPriceWaived?: string | null, starterDnf: boolean, starterEarnings: number, starterHisaRegulated: boolean, starterHorseBreedType?: string | null, starterHorseColor?: string | null, starterHorseDamName?: string | null, starterHorseFoaled?: string | null, starterHorseHisaId?: string | null, starterHorseMicrochips?: string | null, starterHorseName?: string | null, starterHorseReferenceNumber: number, starterHorseRegistry?: string | null, starterHorseSex?: string | null, starterHorseSireName?: string | null, starterHorseTattoo?: string | null, starterJockeyFirstName?: string | null, starterJockeyHisaId?: string | null, starterJockeyLastName?: string | null, starterJockeyReferenceNumber: number, starterJockeyType?: string | null, starterLengthBehindAtFinish: number, starterOdds: number, starterOfficialPosition: number, starterOwnerFirstName?: string | null, starterOwnerHisaId?: string | null, starterOwnerLastName?: string | null, starterOwnerReferenceNumber: number, starterOwnerType?: string | null, starterPositionAtPointOfCall1: number, starterPositionAtPointOfCall2: number, starterPositionAtPointOfCall3: number, starterPositionAtPointOfCall4: number, starterPositionAtPointOfCall5: number, starterPostPosition: number, starterProgramNumber?: string | null, starterRecordType?: string | null, starterScratched: boolean, starterShakes: number, starterTrainerFirstName?: string | null, starterTrainerHisaId?: string | null, starterTrainerLastName?: string | null, starterTrainerReferenceNumber: number, starterTrainerType?: string | null, starterVoidIndicator?: string | null, starterVoidReason?: string | null } | null> | null } | null };


export const TreatmentProtocolByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"TreatmentProtocolById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"treatmentProtocolById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"externalTreatmentProtocolId"}},{"kind":"Field","name":{"kind":"Name","value":"personId"}},{"kind":"Field","name":{"kind":"Name","value":"protocolName"}},{"kind":"Field","name":{"kind":"Name","value":"isPublic"}},{"kind":"Field","name":{"kind":"Name","value":"createdDateTime"}},{"kind":"Field","name":{"kind":"Name","value":"lastUpdatedDateTime"}},{"kind":"Field","name":{"kind":"Name","value":"isDeleted"}},{"kind":"Field","name":{"kind":"Name","value":"treatments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"externalTreatmentTemplateId"}},{"kind":"Field","name":{"kind":"Name","value":"externalTreatmentProtocolId"}},{"kind":"Field","name":{"kind":"Name","value":"clearedToWork"}},{"kind":"Field","name":{"kind":"Name","value":"clearedToRace"}},{"kind":"Field","name":{"kind":"Name","value":"recType"}},{"kind":"Field","name":{"kind":"Name","value":"vaccine"}},{"kind":"Field","name":{"kind":"Name","value":"drugName"}},{"kind":"Field","name":{"kind":"Name","value":"drugRoute"}},{"kind":"Field","name":{"kind":"Name","value":"drugDosage"}},{"kind":"Field","name":{"kind":"Name","value":"procedure"}},{"kind":"Field","name":{"kind":"Name","value":"surgery"}},{"kind":"Field","name":{"kind":"Name","value":"dental"}},{"kind":"Field","name":{"kind":"Name","value":"physiotherapy"}},{"kind":"Field","name":{"kind":"Name","value":"chiropractic"}},{"kind":"Field","name":{"kind":"Name","value":"conditionTreated"}},{"kind":"Field","name":{"kind":"Name","value":"modality"}},{"kind":"Field","name":{"kind":"Name","value":"testName"}},{"kind":"Field","name":{"kind":"Name","value":"testResults"}},{"kind":"Field","name":{"kind":"Name","value":"limbTreated"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}},{"kind":"Field","name":{"kind":"Name","value":"structure"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"classifiedAs"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"internalNotes"}},{"kind":"Field","name":{"kind":"Name","value":"isDeleted"}}]}}]}}]}}]} as unknown as DocumentNode<TreatmentProtocolByIdQuery, TreatmentProtocolByIdQueryVariables>;
export const TreatmentProtocolsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"TreatmentProtocols"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"personId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"treatmentProtocols"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"take"},"value":{"kind":"IntValue","value":"1000"}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"personId"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"personId"}}}]}},{"kind":"ObjectField","name":{"kind":"Name","value":"isDeleted"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"neq"},"value":{"kind":"BooleanValue","value":true}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"externalTreatmentProtocolId"}},{"kind":"Field","name":{"kind":"Name","value":"personId"}},{"kind":"Field","name":{"kind":"Name","value":"protocolName"}},{"kind":"Field","name":{"kind":"Name","value":"isPublic"}},{"kind":"Field","name":{"kind":"Name","value":"createdDateTime"}},{"kind":"Field","name":{"kind":"Name","value":"lastUpdatedDateTime"}},{"kind":"Field","name":{"kind":"Name","value":"isDeleted"}},{"kind":"Field","name":{"kind":"Name","value":"treatments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"externalTreatmentTemplateId"}},{"kind":"Field","name":{"kind":"Name","value":"externalTreatmentProtocolId"}},{"kind":"Field","name":{"kind":"Name","value":"clearedToWork"}},{"kind":"Field","name":{"kind":"Name","value":"clearedToRace"}},{"kind":"Field","name":{"kind":"Name","value":"recType"}},{"kind":"Field","name":{"kind":"Name","value":"vaccine"}},{"kind":"Field","name":{"kind":"Name","value":"drugName"}},{"kind":"Field","name":{"kind":"Name","value":"drugRoute"}},{"kind":"Field","name":{"kind":"Name","value":"drugDosage"}},{"kind":"Field","name":{"kind":"Name","value":"procedure"}},{"kind":"Field","name":{"kind":"Name","value":"surgery"}},{"kind":"Field","name":{"kind":"Name","value":"dental"}},{"kind":"Field","name":{"kind":"Name","value":"physiotherapy"}},{"kind":"Field","name":{"kind":"Name","value":"chiropractic"}},{"kind":"Field","name":{"kind":"Name","value":"conditionTreated"}},{"kind":"Field","name":{"kind":"Name","value":"modality"}},{"kind":"Field","name":{"kind":"Name","value":"testName"}},{"kind":"Field","name":{"kind":"Name","value":"testResults"}},{"kind":"Field","name":{"kind":"Name","value":"limbTreated"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}},{"kind":"Field","name":{"kind":"Name","value":"structure"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"classifiedAs"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"internalNotes"}},{"kind":"Field","name":{"kind":"Name","value":"isDeleted"}}]}}]}}]}}]}}]} as unknown as DocumentNode<TreatmentProtocolsQuery, TreatmentProtocolsQueryVariables>;
export const RunnersQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"RunnersQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"take"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RunnersDataQueryParamsInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"RunnersDataFilterInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"order"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RunnersDataSortInput"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"runnersData"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"take"},"value":{"kind":"Variable","name":{"kind":"Name","value":"take"}}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}},{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}},{"kind":"Argument","name":{"kind":"Name","value":"order"},"value":{"kind":"Variable","name":{"kind":"Name","value":"order"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"timestampRunnerNumber"}},{"kind":"Field","name":{"kind":"Name","value":"runnerDeath"}},{"kind":"Field","name":{"kind":"Name","value":"runnerDNF"}},{"kind":"Field","name":{"kind":"Name","value":"runnerRaceDeath"}},{"kind":"Field","name":{"kind":"Name","value":"runnerScratched"}},{"kind":"Field","name":{"kind":"Name","value":"runnerStart"}},{"kind":"Field","name":{"kind":"Name","value":"locked"}},{"kind":"Field","name":{"kind":"Name","value":"preferredCurrentAsOfIncremental"}},{"kind":"Field","name":{"kind":"Name","value":"preferredRecType"}},{"kind":"Field","name":{"kind":"Name","value":"raceBreedTb"}},{"kind":"Field","name":{"kind":"Name","value":"raceCountry"}},{"kind":"Field","name":{"kind":"Name","value":"raceDate"}},{"kind":"Field","name":{"kind":"Name","value":"raceDistanceFurlong"}},{"kind":"Field","name":{"kind":"Name","value":"raceNumber"}},{"kind":"Field","name":{"kind":"Name","value":"raceOnTheFlat"}},{"kind":"Field","name":{"kind":"Name","value":"raceSurface"}},{"kind":"Field","name":{"kind":"Name","value":"raceSurfaceCondition"}},{"kind":"Field","name":{"kind":"Name","value":"raceTrackId"}},{"kind":"Field","name":{"kind":"Name","value":"raceType"}},{"kind":"Field","name":{"kind":"Name","value":"runnerDnf"}},{"kind":"Field","name":{"kind":"Name","value":"runnerHisaId"}},{"kind":"Field","name":{"kind":"Name","value":"runnerHorseBreed"}},{"kind":"Field","name":{"kind":"Name","value":"runnerIncludeInMetricsReport"}},{"kind":"Field","name":{"kind":"Name","value":"runnerScratched2"}},{"kind":"Field","name":{"kind":"Name","value":"runnerTjcNumber"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}}]}}]} as unknown as DocumentNode<RunnersQueryQuery, RunnersQueryQueryVariables>;
export const RunnersResultQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"RunnersResultQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"take"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RunnersResultQueryParamsInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"RunnersResultDataFilterInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"order"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RunnersResultDataSortInput"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"runnersResult"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"take"},"value":{"kind":"Variable","name":{"kind":"Name","value":"take"}}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}},{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}},{"kind":"Argument","name":{"kind":"Name","value":"order"},"value":{"kind":"Variable","name":{"kind":"Name","value":"order"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"currentAsOf"}},{"kind":"Field","name":{"kind":"Name","value":"currentAsOfIncremental"}},{"kind":"Field","name":{"kind":"Name","value":"hisaCriteriaRace"}},{"kind":"Field","name":{"kind":"Name","value":"locationId"}},{"kind":"Field","name":{"kind":"Name","value":"raceClaimingPrice"}},{"kind":"Field","name":{"kind":"Name","value":"raceCondition"}},{"kind":"Field","name":{"kind":"Name","value":"raceCountry"}},{"kind":"Field","name":{"kind":"Name","value":"raceCourse"}},{"kind":"Field","name":{"kind":"Name","value":"raceDate"}},{"kind":"Field","name":{"kind":"Name","value":"raceDescription"}},{"kind":"Field","name":{"kind":"Name","value":"raceDistance"}},{"kind":"Field","name":{"kind":"Name","value":"raceDistanceFurlong"}},{"kind":"Field","name":{"kind":"Name","value":"raceDistanceFurlongRound"}},{"kind":"Field","name":{"kind":"Name","value":"raceFootnote"}},{"kind":"Field","name":{"kind":"Name","value":"raceOffTime"}},{"kind":"Field","name":{"kind":"Name","value":"racePostTime"}},{"kind":"Field","name":{"kind":"Name","value":"racePurse"}},{"kind":"Field","name":{"kind":"Name","value":"raceRaceNumber"}},{"kind":"Field","name":{"kind":"Name","value":"raceTrackId"}},{"kind":"Field","name":{"kind":"Name","value":"raceTrackName"}},{"kind":"Field","name":{"kind":"Name","value":"raceType"}},{"kind":"Field","name":{"kind":"Name","value":"starterClaimedPriceUsa"}},{"kind":"Field","name":{"kind":"Name","value":"starterClaimIndicator"}},{"kind":"Field","name":{"kind":"Name","value":"starterClaimingPriceWaived"}},{"kind":"Field","name":{"kind":"Name","value":"starterDnf"}},{"kind":"Field","name":{"kind":"Name","value":"starterEarnings"}},{"kind":"Field","name":{"kind":"Name","value":"starterHisaRegulated"}},{"kind":"Field","name":{"kind":"Name","value":"starterHorseBreedType"}},{"kind":"Field","name":{"kind":"Name","value":"starterHorseColor"}},{"kind":"Field","name":{"kind":"Name","value":"starterHorseDamName"}},{"kind":"Field","name":{"kind":"Name","value":"starterHorseFoaled"}},{"kind":"Field","name":{"kind":"Name","value":"starterHorseHisaId"}},{"kind":"Field","name":{"kind":"Name","value":"starterHorseMicrochips"}},{"kind":"Field","name":{"kind":"Name","value":"starterHorseName"}},{"kind":"Field","name":{"kind":"Name","value":"starterHorseReferenceNumber"}},{"kind":"Field","name":{"kind":"Name","value":"starterHorseRegistry"}},{"kind":"Field","name":{"kind":"Name","value":"starterHorseSex"}},{"kind":"Field","name":{"kind":"Name","value":"starterHorseSireName"}},{"kind":"Field","name":{"kind":"Name","value":"starterHorseTattoo"}},{"kind":"Field","name":{"kind":"Name","value":"starterJockeyFirstName"}},{"kind":"Field","name":{"kind":"Name","value":"starterJockeyHisaId"}},{"kind":"Field","name":{"kind":"Name","value":"starterJockeyLastName"}},{"kind":"Field","name":{"kind":"Name","value":"starterJockeyReferenceNumber"}},{"kind":"Field","name":{"kind":"Name","value":"starterJockeyType"}},{"kind":"Field","name":{"kind":"Name","value":"starterLengthBehindAtFinish"}},{"kind":"Field","name":{"kind":"Name","value":"starterOdds"}},{"kind":"Field","name":{"kind":"Name","value":"starterOfficialPosition"}},{"kind":"Field","name":{"kind":"Name","value":"starterOwnerFirstName"}},{"kind":"Field","name":{"kind":"Name","value":"starterOwnerHisaId"}},{"kind":"Field","name":{"kind":"Name","value":"starterOwnerLastName"}},{"kind":"Field","name":{"kind":"Name","value":"starterOwnerReferenceNumber"}},{"kind":"Field","name":{"kind":"Name","value":"starterOwnerType"}},{"kind":"Field","name":{"kind":"Name","value":"starterPositionAtPointOfCall1"}},{"kind":"Field","name":{"kind":"Name","value":"starterPositionAtPointOfCall2"}},{"kind":"Field","name":{"kind":"Name","value":"starterPositionAtPointOfCall3"}},{"kind":"Field","name":{"kind":"Name","value":"starterPositionAtPointOfCall4"}},{"kind":"Field","name":{"kind":"Name","value":"starterPositionAtPointOfCall5"}},{"kind":"Field","name":{"kind":"Name","value":"starterPostPosition"}},{"kind":"Field","name":{"kind":"Name","value":"starterProgramNumber"}},{"kind":"Field","name":{"kind":"Name","value":"starterRecordType"}},{"kind":"Field","name":{"kind":"Name","value":"starterScratched"}},{"kind":"Field","name":{"kind":"Name","value":"starterShakes"}},{"kind":"Field","name":{"kind":"Name","value":"starterTrainerFirstName"}},{"kind":"Field","name":{"kind":"Name","value":"starterTrainerHisaId"}},{"kind":"Field","name":{"kind":"Name","value":"starterTrainerLastName"}},{"kind":"Field","name":{"kind":"Name","value":"starterTrainerReferenceNumber"}},{"kind":"Field","name":{"kind":"Name","value":"starterTrainerType"}},{"kind":"Field","name":{"kind":"Name","value":"starterVoidIndicator"}},{"kind":"Field","name":{"kind":"Name","value":"starterVoidReason"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}}]}}]} as unknown as DocumentNode<RunnersResultQueryQuery, RunnersResultQueryQueryVariables>;