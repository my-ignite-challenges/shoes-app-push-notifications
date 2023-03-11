import OneSignal from "react-native-onesignal";

export function createUserInfoTag() {
  OneSignal.sendTags({
    user_name: "Fulano",
    user_email: "email@email.com",
  });
}

export function updateCartTags(itemsCount: string) {
  OneSignal.sendTag("cart_items_count", itemsCount);
}
