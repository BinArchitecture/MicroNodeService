namespace java com.lpp.util.test.thrift
    service RedisMicroService{
     i64 getTableSequenceNo(1: string key)
}