import React, { Component } from "react";
import { _getExtraInforDoctorById } from "../../../../services/userService";
import { connect } from "react-redux";
import { LANGUEGA } from "../../../../utils";
import NumberFormat from "react-number-format";
import { FormattedMessage } from "react-intl";
import "./DoctorExtrainfor.scss";

class DoctorExtrainfor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isShowPrice: true,
      extraInforDoctor: {},
    };
  }
  handleShowPrice = () => {
    this.setState({
      isShowPrice: !this.state.isShowPrice,
    });
  };
  async componentDidMount() {}
  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.language !== this.props.language) {
    }
    if (prevProps.dotorIdFromParent !== this.props.dotorIdFromParent) {
      let { dotorIdFromParent } = this.props;
      let res = await _getExtraInforDoctorById(dotorIdFromParent);
      if (res && res.errCode === 0) {
        this.setState({
          extraInforDoctor: res.data,
        });
      }
    }
  }
  render() {
    let { isShowPrice, extraInforDoctor } = this.state;
    let { language } = this.props;
    // console.log(extraInforDoctor.priceData.valueVi);
    return (
      <div className="doctor-extra-infor-container">
        <div className="content-up">
          <div className="text-address">
            <FormattedMessage id="patient.extra-infor-doctor.address-exam" />
          </div>
          <div className="clinic-name">
            {extraInforDoctor && extraInforDoctor.nameClinic
              ? extraInforDoctor.nameClinic
              : ""}
          </div>
          <div className="clinic-address">
            {extraInforDoctor && extraInforDoctor.addressClinic
              ? extraInforDoctor.addressClinic
              : ""}
          </div>
        </div>
        <div className="content-down">
          {isShowPrice ? (
            <div>
              <div className="text-price">
                <FormattedMessage id="patient.extra-infor-doctor.price-exam" />

                {extraInforDoctor && extraInforDoctor.priceData && (
                  <NumberFormat
                    className="crruPrice"
                    value={
                      language === LANGUEGA.VI
                        ? extraInforDoctor.priceData.valueVi
                        : extraInforDoctor.priceData.valueEn
                    }
                    displayType={"text"}
                    thousandSeparator={true}
                    suffix={language === LANGUEGA.VI ? "VND" : "$"}
                  />
                )}
                <span
                  className="detail-price"
                  onClick={() => this.handleShowPrice()}
                >
                  <FormattedMessage id="patient.extra-infor-doctor.detail-price" />
                </span>
              </div>
            </div>
          ) : (
            <>
              <div className="text-price">
                <FormattedMessage id="patient.extra-infor-doctor.price-exam" />
              </div>
              <div className="price-content">
                <div className="type-price">
                  <div className="type-price-left">
                    <FormattedMessage id="patient.extra-infor-doctor.price-exam" />
                  </div>
                  <div className="type-price-right">
                    {extraInforDoctor && extraInforDoctor.priceData && (
                      <NumberFormat
                        className="crruPrice"
                        value={
                          language === LANGUEGA.VI
                            ? extraInforDoctor.priceData.valueVi
                            : extraInforDoctor.priceData.valueEn
                        }
                        displayType={"text"}
                        thousandSeparator={true}
                        suffix={language === LANGUEGA.VI ? "VND" : "$"}
                      />
                    )}
                  </div>
                </div>
                <div className="payment">
                  <FormattedMessage id="patient.extra-infor-doctor.user-payment" />
                  {extraInforDoctor &&
                  extraInforDoctor.paymentData &&
                  language === LANGUEGA.VI
                    ? extraInforDoctor.paymentData.valueVi
                    : extraInforDoctor.paymentData.valueEn}
                </div>
              </div>
              <div className="hidden" onClick={() => this.handleShowPrice()}>
                <FormattedMessage id="patient.extra-infor-doctor.hidden-price" />
              </div>
            </>
          )}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  language: state.app.language,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtrainfor);
