package model;

public class CustomerDTO {
    private String cId;
    private String cName;
    private String cAddress;
    private String phnNum;

    public CustomerDTO() {
    }

    public CustomerDTO(String cId, String cName, String cAddress, String phnNum) {
        this.cId = cId;
        this.cName = cName;
        this.cAddress = cAddress;
        this.phnNum = phnNum;
    }

    public String getcId() {
        return cId;
    }

    public void setcId(String cId) {
        this.cId = cId;
    }

    public String getcName() {
        return cName;
    }

    public void setcName(String cName) {
        this.cName = cName;
    }

    public String getcAddress() {
        return cAddress;
    }

    public void setcAddress(String cAddress) {
        this.cAddress = cAddress;
    }

    public String getPhnNum() {
        return phnNum;
    }

    public void setPhnNum(String phnNum) {
        this.phnNum = phnNum;
    }

    @Override
    public String toString() {
        return "CustomerDTO{" +
                "cId='" + cId + '\'' +
                ", cName='" + cName + '\'' +
                ", cAddress='" + cAddress + '\'' +
                ", phnNum='" + phnNum + '\'' +
                '}';
    }
}
