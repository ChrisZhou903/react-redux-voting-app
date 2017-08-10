import { connect } from 'react-redux'
import VoteDetail from '../components/Vote/VoteDetail'
import { addVote, updateVote, fetchVoteDetail } from '../actions/vote'
import { getCurrentVote } from '../selectors'

const mapStateToProps = (state, ownProps) => ({
  vote: getCurrentVote(state, ownProps),
})

const mapDispatchToProps = dispatch => ({
  addVote: data => {
    dispatch(addVote(data))
  },
  updateVote: (id, data) => {
    dispatch(updateVote(id, data))
  },
  fetchVoteDetail: id => {
    dispatch(fetchVoteDetail(id))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(VoteDetail)
