namespace java com.lppz.test.thrift

service IThriftTestInterfaceThriftService {
     string serviceInvoke(1:string json)
	 string string2Int(1:string param)
     }