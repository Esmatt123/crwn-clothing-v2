import { AnyAction } from "redux"; //* An Action type which accepts any other properties. This is mainly for the use of the Reducer type. This is not part of Action itself to prevent types that extend Action from having an index signature.

//*these have the same name, they are function overloads

type Matchable<AC extends () => AnyAction> = AC & {
  //* action creator which is an object that returns any extra props,
  type: ReturnType<AC>["type"]; //* this will return an action, and extract the type from it.
  match(action: AnyAction): action is ReturnType<AC>; //* Action matches with whatever is the returntype
};

export function withMatcher<AC extends () => AnyAction & { type: string }>( //* this is the withmatcher but without args because in typescript we need to have 3 versions of the same function
  actionCreator: AC
): Matchable<AC>;

export function withMatcher<
  //* this is the withmatcher function but with args
  AC extends (...args: any[]) => AnyAction & { type: string }
>(actionCreator: AC): Matchable<AC>;

export function withMatcher(actionCreator: Function) {
  //* this function tries to match the type of the action within the actioncreator.
  const type = actionCreator().type; //* type = returned action.type
  return Object.assign(actionCreator, {
    //* creates a new object with actioncreator, type and the match function
    type,
    match(action: AnyAction) {
      return action.type === type; //* the match function returns the action type that is the same as our own action type
    },
  });
}
export type ActionWithPayload<T, P> = {
  type: T; //* this is what will trigger if there is a payload
  payload: P;
};

export type Action<T> = {
  type: T; //* this is what will trigger if there is no payload
};

export function createAction<T extends string, P>(
  type: T,
  payload: P
): ActionWithPayload<T, P>; //* This is what will get called if the action has both a type and payload

export function createAction<T extends string>(
  type: T,
  payload: void
): Action<T>;

export function createAction<T extends string, P>(type: T, payload: P) {
  //* This is the type version of a normal createAction
  return { type, payload };
}
