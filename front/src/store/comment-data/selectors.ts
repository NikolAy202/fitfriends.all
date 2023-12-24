import {NameSpace} from '../../const';
import {State} from '../../types/state';
import {Comment} from '../../types/training';


export const getComments = (state: State): Comment[] => state[NameSpace.DataComments].comments;
export const getSignCommentsLoading = (state: State): boolean => state[NameSpace.DataComments].isCommentsDataLoading;
export const getErrorPost = (state: State): boolean => state[NameSpace.DataComments].hasErrorPostComment;
