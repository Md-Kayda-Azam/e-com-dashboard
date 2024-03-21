import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

// get all permission
export const getAllPermission = createAsyncThunk(
  "user/getAllPermission",
  async () => {
    try {
      const response = await api.get(
        "/permission",
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
// get all roles
export const getAllRoles = createAsyncThunk("user/getAllRoles", async () => {
  try {
    const response = await api.get("/role", {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});
// create permission
export const createPermission = createAsyncThunk(
  "user/createPermission",
  async (data) => {
    try {
      const response = await api.post(
        "/permission",
        data,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
// delete permission
export const deletePermission = createAsyncThunk(
  "user/deletePermission",
  async (id) => {
    try {
      const response = await api.delete(
        `/permission/${id}`,

        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
// delete permissions
export const deletePermissions = createAsyncThunk(
  "user/deletePermissions",
  async (data) => {
    try {
      const response = await api.post(
        `/permission/deletePermissions`,
        data,

        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
// delete permission
export const deleteRole = createAsyncThunk("user/deleteRole", async (id) => {
  try {
    const response = await api.delete(
      `/role/${id}`,

      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});
// delete roles
export const deleteRoles = createAsyncThunk(
  "user/deleteRoles",
  async (data) => {
    try {
      const response = await api.post(
        `/role/deleteRoles`,
        data,

        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
// update Permission Status Data
export const updatePermissionStatusData = createAsyncThunk(
  "user/updatePermissionStatusData",
  async ({ id, status }) => {
    try {
      const response = await api.post(
        `/permission/${id}`,
        { status },
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
// update Role Status Data
export const updateRoleStatusData = createAsyncThunk(
  "user/updateRoleStatusData",
  async ({ id, status }) => {
    try {
      const response = await api.post(
        `/role/${id}`,
        { status },
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

// create role
export const createRole = createAsyncThunk("user/createRole", async (data) => {
  try {
    const response = await api.post("/role",
      data,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});
// update role
export const updateRole = createAsyncThunk("user/updateRole", async (data) => {
  try {
    const response = await api.put(
      `/role/${data.id}`,
      data,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});
// create user
export const createUser = createAsyncThunk("user/createUser", async (data) => {
  try {
    const response = await api.post("/user",
      data,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});
// get all users
export const getAllUsers = createAsyncThunk("user/getAllUsers", async () => {
  try {
    const response = await api.get("/user",

      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});
// delete user
export const deleteUser = createAsyncThunk("user/deleteUser", async (id) => {
  try {
    const response = await api.delete(
      `/user/${id}`,

      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});
// Update User Status Data
export const updateUserStatusData = createAsyncThunk(
  "user/updateUserStatusData",
  async ({ id, status }) => {
    try {
      const response = await api.post(
        `/user/${id}`,
        { status },
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
// Update User Status Data
export const updateUser = createAsyncThunk(
  "user/updateUserUpdate",
  async (data) => {
    try {
      const response = await api.put(
        `/user/${data._id}`,
        data,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
// Update User Status Data
export const deleteUsers = createAsyncThunk(
  "user/deleteUsers",
  async (data) => {
    try {
      const response = await api.post(
        `/user/deleteUsers`,
        data,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
