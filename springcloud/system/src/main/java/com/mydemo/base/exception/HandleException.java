package com.mydemo.base.exception;

import com.mydemo.base.result.ResultEnum;

public class HandleException extends RuntimeException{

    private static final long serialVersionUID = 4474665452231795065L;

    private String code;

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public HandleException(ResultEnum resultEnum, String detailMsg) {
        super(resultEnum.getResultMsg() + detailMsg);
        this.code = resultEnum.getResultCode();
    }
}

