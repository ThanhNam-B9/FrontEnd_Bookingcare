import React, { Component } from "react";

// Import css files

import { connect } from "react-redux";
class About extends Component {
  render() {
    return (
      <div className="selection-share selection-about">
        <div className="selection-container">
          <div className="selection-header">
            <span>Truyền thông nói về Nam IT</span>
          </div>
          <div className="section-about-content">
            <div className="content-left">
              <iframe
                width="100%"
                height={300}
                src="https://www.youtube.com/embed/jDZ1BfEGIl8"
                title="YouTube video player"
                frameBorder={0}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="content-right">
              <p>
                Chuyện tình ngày xưa mơ hồ như cơ gió vô tình Từng mùa đông qua
                luôn làm se sắt trái tim mình Chẳng còn chi nữa sao lòng ta cứ
                mãi bâng khuâng khi trời mưa Và dường như niềm thương nhớ vẫn
                chưa phai mờ Đoạn đường ngày xưa, anh cùng em chung bước đi về
                Đoạn đường hôm nay, riêng mình anh lê gót ê chề Đường vào tình
                yêu, sao giờ đây rẽ lối chia đôi trong tịch liêu Bởi vì đâu hai
                chúng ta không thể có nhau Còn nhớ những lúc đắm đuối, vui với
                nhau em thường tươi cười Và em nói em sẽ mai yêu đến trọn cuộc
                đời Thời gian như con nước trôi Lời em như cơn gió thôi Và giờ
                đây em bỏ anh một mình đơn côi Nếu lúc trước em đừng tới Có lẽ
                tốt hơn người ơi Và anh chẳng cần bận tâm những điều gian dối
                Nếu lúc trước em đừng nói Nói những tiếng yêu đầu môi Thì đâu
                buồn chi khi mỗi đứa một phương trời
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    // changeLanguageRedux: (language) => dispatch(changeLanguegaApp(language)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(About);
