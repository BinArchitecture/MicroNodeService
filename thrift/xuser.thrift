namespace java com.lppz.test.thrift

struct User{
     1: string uid,
     2: string uname,
     3: bool usex,
     4: i16 uage
    }
    service UserService{
     void add(1: User u),
     string adduname(1: string uname),
     User get(1: string uid)
}