package imi.jazzberry.chat.service;

import imi.jazzberry.chat.exception.MemberDoesNotExistException;
import imi.jazzberry.chat.model.aggregation.ChatroomMember;
import imi.jazzberry.chat.model.chatroom.Chatroom;
import imi.jazzberry.chat.model.member.Member;
import imi.jazzberry.chat.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;

@Service
public class MemberService {
    public final MemberRepository memberRepository;

    @Autowired
    public MemberService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    public Optional<Member> save(Member member) {
        return Optional.of(memberRepository.save(member));
    }
    public Optional<Member> save(Member member, Chatroom chatroom) {
        var chatroomMember = new ChatroomMember();
        chatroomMember.setMember(member);
        chatroomMember.setChatroom(chatroom);

        if(member.getChatroomMembers() == null)
            member.setChatroomMembers(new HashSet<>());
        member.addChatroomMember(chatroomMember);

        return Optional.of(memberRepository.save(member));
    }

    public Optional<Member> save(long memberId, String memberName) {
        Member member = new Member();

        member.setId(memberId);
        member.setName(memberName);

        return save(member);
    }

    public Optional<Member> findMemberById(Long id, boolean raiseWrongIdException) {
        var member = memberRepository.findById(id);
        if(member.isEmpty() && raiseWrongIdException)
            throw new MemberDoesNotExistException(
                String.format("User with id %d does not exist", id));

        return member;
    }

    public Optional<Member> findById(Long id) {
        return memberRepository.findById(id);
    }

    public List<Member> findAcquaintancesOfMember(Long id) {
        return memberRepository.findAcquaintancesOfMember(id);
    }
}
