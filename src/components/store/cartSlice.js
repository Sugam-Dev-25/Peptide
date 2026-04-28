import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ✅ FETCH CART (WITH NONCE)
export const fetchCart = createAsyncThunk("cart/fetchCart", async () => {
  const res = await fetch("/api/wp-json/wc/store/cart", {
    credentials: "include",
  });

  // 🔥 GET NONCE FROM HEADER
  const nonce = res.headers.get("Nonce");

  const data = await res.json();
console.log("Add to cart response:", data);
  return {
    data,
    nonce,
  };
});

// ✅ ADD TO CART (WITH NONCE)
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ productId, nonce }) => {
    const res = await fetch(
      "/api/wp-json/wc/store/cart/add-item",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Nonce: nonce, // 🔥 IMPORTANT
        },
        body: JSON.stringify({
          id: productId,
          quantity: 1,
        }),
        credentials: "include",
      }
    );

    // 🔥 DEBUG ERROR
    if (!res.ok) {
      const err = await res.text();
      console.error("Add to cart error:", err);
      throw new Error("Failed to add to cart");
    }

    const data = await res.json();
    return data;
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalItems: 0,
    nonce: null, // ✅ STORE NONCE
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // ✅ FETCH CART
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.items = action.payload.data.items;
        state.totalItems = action.payload.data.items_count;
        state.nonce = action.payload.nonce; // 🔥 SAVE NONCE
      })

      // ✅ ADD TO CART
      .addCase(addToCart.fulfilled, (state, action) => {
        state.items = action.payload.items;
        state.totalItems = action.payload.items_count;
      });
  },
});

export default cartSlice.reducer;