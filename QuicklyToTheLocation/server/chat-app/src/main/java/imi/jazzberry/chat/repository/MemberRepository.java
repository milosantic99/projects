package imi.jazzberry.chat.repository;

import imi.jazzberry.chat.model.member.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MemberRepository extends JpaRepository<Member, Long> {
    @Query("SELECT DISTINCT m1 FROM Member m1"
            + " JOIN m1.chatroomMembers cm1"
        + " WHERE EXISTS ("
            + " SELECT DISTINCT m2 FROM Member m2"
                + " JOIN m2.chatroomMembers cm2"
            + " WHERE cm1.chatroom.id = cm2.chatroom.id"
            + " AND m2.id = :id"
            + " AND m2.id <> m1.id)")
    List<Member> findAcquaintancesOfMember(Long id);
}
