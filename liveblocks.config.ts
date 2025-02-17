import {
  LiveList,
  LiveMap,
  LiveObject,
  createClient,
} from "@liveblocks/client";
import { createRoomContext, createLiveblocksContext } from "@liveblocks/react";
import { Cursor, GameState, Message, RoundState } from "./lib/types";

const client = createClient({
  // publicApiKey:
  // "pk_prod_QMnF7E39bQMTvYkJncs_Drl77jUfdxxe9lm2OoFdxThxH2O4L-H3EisvTnxczcLt",
  authEndpoint: async (room) => {
    const headers = {
      "Content-Type": "application/json",
    };

    const body = JSON.stringify({ room });

    const response = await fetch("/api/liveblocks-auth", {
      method: "POST",
      headers,
      body,
    });

    if (response.status === 401) {
      window.location.href = "/sign-in";
    }

    return await response.json();
  },

  throttle: 16,
  backgroundKeepAliveTimeout: 15 * 60 * 1000,
  lostConnectionTimeout: 5000,
  async resolveUsers({ userIds }) {
    // Used only for Comments and Notifications. Return a list of user information
    // retrieved from `userIds`. This info is used in comments, mentions etc.

    // const usersData = await __fetchUsersFromDB__(userIds);
    //
    // return usersData.map((userData) => ({
    //   name: userData.name,
    //   avatar: userData.avatar.src,
    // }));

    return [];
  },
  async resolveMentionSuggestions({ text }) {
    // Used only for Comments. Return a list of userIds that match `text`.
    // These userIds are used to create a mention list when typing in the
    // composer.
    //
    // For example when you type "@jo", `text` will be `"jo"`, and
    // you should to return an array with John and Joanna's userIds:
    // ["john@example.com", "joanna@example.com"]

    // const users = await getUsers({ search: text });
    // return users.map((user) => user.id);

    return [];
  },
  async resolveRoomsInfo({ roomIds }) {
    // Used only for Comments and Notifications. Return a list of room information
    // retrieved from `roomIds`.

    // const roomsData = await __fetchRoomsFromDB__(roomIds);
    //
    // return roomsData.map((roomData) => ({
    //   name: roomData.name,
    //   url: roomData.url,
    // }));

    return [];
  },
});

// Presence represents the properties that exist on every user in the Room
// and that will automatically be kept in sync. Accessible through the
// `user.presence` property. Must be JSON-serializable.
export type Presence = {
  cursor: Cursor | null;
  isDrawing: boolean;
  lastUsedColor: string | null;
  pencilDraft: { x: number; y: number }[] | null;
};

// Optionally, Storage represents the shared document that persists in the
// Room, even after all users leave. Fields under Storage typically are
// LiveList, LiveMap, LiveObject instances, for which updates are
// automatically persisted and synced to all connected clients.
type Storage = {
  gameState: LiveObject<GameState>;
  canvasObjects: LiveMap<string, any>;
  messages: LiveList<LiveObject<Message>>;
  roundState: LiveObject<RoundState>;
};

// Optionally, UserMeta represents static/readonly metadata on each user, as
// provided by your own custom auth back end (if used). Useful for data that
// will not change during a session, like a user's name or avatar.
export type UserMeta = {
  id?: string;
  info: {
    username: string;
  };
};

// Optionally, the type of custom events broadcast and listened to in this
// room. Use a union for multiple events. Must be JSON-serializable.
type RoomEvent = {
  // type: "NOTIFICATION",
  // ...
};

// Optionally, when using Comments, ThreadMetadata represents metadata on
// each thread. Can only contain booleans, strings, and numbers.
export type ThreadMetadata = {
  // resolved: boolean;
  // quote: string;
  // time: number;
};

// Room-level hooks, use inside `RoomProvider`
export const {
  suspense: {
    RoomProvider,
    useRoom,
    useMyPresence,
    useUpdateMyPresence,
    useSelf,
    useOthers,
    useOthersMapped,
    useOthersListener,
    useOthersConnectionIds,
    useOther,
    useBroadcastEvent,
    useEventListener,
    useErrorListener,
    useStorage,
    useObject,
    useMap,
    useList,
    useBatch,
    useHistory,
    useUndo,
    useRedo,
    useCanUndo,
    useCanRedo,
    useMutation,
    useStatus,
    useLostConnectionListener,
    useThreads,
    useCreateThread,
    useEditThreadMetadata,
    useCreateComment,
    useEditComment,
    useDeleteComment,
    useAddReaction,
    useRemoveReaction,
    useThreadSubscription,
    useMarkThreadAsRead,
    useRoomNotificationSettings,
    useUpdateRoomNotificationSettings,

    // These hooks can be exported from either context
    // useUser,
    // useRoomInfo
  },
} = createRoomContext<Presence, Storage, UserMeta, RoomEvent, ThreadMetadata>(
  client
);

// Project-level hooks, use inside `LiveblocksProvider`
export const {
  suspense: {
    LiveblocksProvider,
    useMarkInboxNotificationAsRead,
    useMarkAllInboxNotificationsAsRead,
    useInboxNotifications,
    useUnreadInboxNotificationsCount,

    // These hooks can be exported from either context
    useUser,
    useRoomInfo,
  },
} = createLiveblocksContext<UserMeta, ThreadMetadata>(client);
