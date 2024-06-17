import React, { Component } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { getStatusBarHeight } from "react-native-iphone-screen-helper";
import { Modal } from "react-native-js-only-modal";
import GoogleReCaptcha from "./GoogleReCaptcha";
import PropTypes from "prop-types";

const { width, height } = Dimensions.get("window");
const modalTopOffset = Platform.OS === "ios" ? getStatusBarHeight() + 20 : 40;

class ConfirmGoogleCaptcha extends Component {
  state = {
    show: false,
  };
  show = () => {
    this.setState({ show: true });
  };
  hide = () => {
    this.setState({ show: false });
  };
  render() {
    let { show } = this.state;
    let { siteKey, baseUrl, languageCode, onMessage, cancelButtonText } =
      this.props;

    return (
      <Modal
        style={styles.modal}
        backDropStyle={styles.background}
        visible={show}
        animationIn={"fadeIn"}
        animationOut={"fadeOut"}
        hideBackDrop={false}
        duration={300}
        useNativeDriver={true}
      >
        <View style={styles.wrapper}>
          <GoogleReCaptcha
            url={baseUrl}
            siteKey={siteKey}
            onMessage={onMessage}
            languageCode={languageCode}
            cancelButtonText={cancelButtonText}
          />
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginTop: 10,
  },
  modal: { margin: 0, height, width },
  background: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    overflow: "hidden",
  },
  wrapper: {
    flex: 1,
    paddingTop: modalTopOffset,
  },
});
ConfirmGoogleCaptcha.propTypes = {
  siteKey: PropTypes.string.isRequired,
  baseUrl: PropTypes.string,
  onMessage: PropTypes.func,
  languageCode: PropTypes.string,
  cancelButtonText: PropTypes.string,
};
export default ConfirmGoogleCaptcha;
