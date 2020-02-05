package com.leverx.sample.context;

import com.sap.cds.ql.cqn.CqnSelect;
import com.sap.cds.services.EventContext;
import com.sap.cds.services.EventName;

@EventName("*")
public interface CustomFunctionEventContext extends EventContext {

    CqnSelect getCqn();
    void setCqn(CqnSelect select);

    Object getResult();
    void setResult(Object review);

}
